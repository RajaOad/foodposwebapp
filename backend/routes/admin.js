const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const User = require('../models/User'); // WebsiteUser model
const AdminUser = require('../models/Admin'); // AdminUser model

// Admin User Routes

// Create a new admin user
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isAdmin = require('../middleware/isAdmin');
const secretKey = process.env.SECRET_KEY;

router.post('/admin/register', async (req, res) => {
    try {
        // Check if an admin user already exists with the provided email
        const dbAdmin = await AdminUser.findOne({ email: req.body.email });

        if (dbAdmin) {
            return res.status(400).json({ error: 'Admin already exists with this email' });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new AdminUser using the provided data
        const createdAdmin = await AdminUser.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // Prepare user object for JWT token creation
        const admin = {
            id: createdAdmin._id,
            email: createdAdmin.email,
            isAdmin: createdAdmin.isAdmin
        };

        // Generate JWT token for the admin
        const authToken = jwt.sign(admin, secretKey);

        // Send success response with JWT token and message
        res.status(201).json({ success: true, authToken, isAdmin:createdAdmin.isAdmin, msg: 'Admin registered successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/admin/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        // Check if an admin user exists with the given email
        let adminUser = await AdminUser.findOne({ email });

        // If admin user doesn't exist, send an error response
        if (!adminUser) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        }

        // Compare the password provided with the hashed password in the database
        const comparedPass = await bcrypt.compare(password, adminUser.password);

        // If passwords don't match, send an error response
        if (!comparedPass) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        }

        // If everything is fine, create a JWT token for the admin user
        const admin = {
            id: adminUser._id,
            email: adminUser.email,
            isAdmin: adminUser.isAdmin
        }

        const authToken = jwt.sign(admin, secretKey);

        // Send a success response with the auth token
        res.status(200).json({ success: true, authToken, isAdmin: adminUser.isAdmin, msg: 'Login successful' });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
