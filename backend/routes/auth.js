
const express = require("express");
const router = express.Router();
const userModel = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secretKey = process.env.SECRET_KEY;


router.post("/register", async (req, res) => {

    try {

        const dbUser = await userModel.findOne({ email: req.body.email });

        if (dbUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const createdUser = await userModel.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass,
        })

        const user = {
            id: createdUser._id,
            email: createdUser.email
        }

        const authToken = jwt.sign(user, secretKey);

        res.status(201).json({ success: true, authToken, msg: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }



})

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {

        let dbUser = await userModel.findOne({ email });

        if (!dbUser) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        }

        const comparedPass = await bcrypt.compare(password, dbUser.password);

        if (!comparedPass) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        }

        const user = {
            id: dbUser._id,
            email: dbUser.email
        }

        const authToken = jwt.sign(user, secretKey);

        res.status(200).json({ success: true, authToken, msg: 'Login successful' });


    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

})

module.exports = router;