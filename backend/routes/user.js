
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const User = require('../models/User'); // Assuming you have a User model
const upload = require('../config/multerConfig');
const fs = require('fs');
const path = require('path');
const AdminUser = require('../models/Admin'); // AdminUser model

// GET route to fetch user data based on userId
router.get('/userdata', requireAuth, async (req, res) => {
    try {
        // Retrieve userId from the authenticated request
        const userId = req.user._id;
        let user;

        if (req.user.isAdmin) {
            const admin = await AdminUser.findById(userId);
            if (!admin) {
                return res.status(404).json({ error: 'Admin user not found' });
            }
            user = admin;

        } else {
            // Fetch user data based on userId
            const dbUser = await User.findById(userId);

            if (!dbUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            user = dbUser;

        }

        res.json({ user, success: true })

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update website user details
router.put('/updateuser', requireAuth, async (req, res) => {
    const updatedUser = req.body;
    try {
        const userId = req.user._id;
        const updatedDbUser = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
        if (!updatedDbUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ success: true, msg: "Profile details updated successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update user images (imgUrl and bannerBg) by ID
router.put('/updateuser/images/profile', requireAuth, upload.single('profileImg'), async (req, res) => {
    try {
        const userId = req.user._id
        let imgUrl;
        let dbUser;

        if (req.user.isAdmin) {
            const admin = await AdminUser.findById(userId);
            if (!admin) {
                return res.status(404).json({ error: 'Admin user not found' });
            }
            dbUser = admin;

        } else {
            // Fetch user data based on userId
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            dbUser = user;

        }

        if (req.file) {
            if (dbUser.imgUrl) {
                const imagePath = path.join(__dirname, '..', 'public', dbUser.imgUrl);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            imgUrl = req.file.path;
            imgUrl = imgUrl.replace('public\\uploads', 'uploads');
        }

        let user;

        if(req.user.isAdmin) {
             user = await AdminUser.findByIdAndUpdate(userId, { imgUrl }, { new: true });

        } else {

             user = await User.findByIdAndUpdate(userId, { imgUrl }, { new: true });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found', success: false });
        }
        res.json({ success: true, msg: "Profile picture updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/updateuser/images/banner', requireAuth, upload.single('bannerImg'), async (req, res) => {
    try {
        const userId = req.user._id
        let bannerBg;
        let dbUser;

        if (req.user.isAdmin) {
            const admin = await AdminUser.findById(userId);
            if (!admin) {
                return res.status(404).json({ error: 'Admin user not found' });
            }
            dbUser = admin;

        } else {
            // Fetch user data based on userId
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            dbUser = user;

        }

        if (req.file) {
            if (dbUser.bannerBg) {
                const imagePath = path.join(__dirname, '..', 'public', dbUser.bannerBg);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            bannerBg = req.file.path;
            bannerBg = bannerBg.replace('public\\uploads', 'uploads');
        }

        let user;

        if(req.user.isAdmin) {
             user = await AdminUser.findByIdAndUpdate(userId, { bannerBg }, { new: true });

        } else {

             user = await User.findByIdAndUpdate(userId, { bannerBg }, { new: true });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found', success: false });
        }
        res.json({ success: true, msg: "Profile banner image updated successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
