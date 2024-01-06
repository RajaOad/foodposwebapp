const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const requireAuth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const Product = require('../models/Product');
const User = require("../models/User");
const fs = require('fs');
const path = require('path');
const upload = require('../config/multerConfig');
const AdminUser = require('../models/Admin'); // AdminUser model



// POST route to add a new category
router.post('/addcategory', requireAuth, isAdmin, upload.single('categoryImage'), async (req, res) => {
    try {
        const { name, description } = req.body;

        // Get userId from authenticated request
        const userId = req.user._id;

        const user = await AdminUser.findById(userId);
        
        // Check if the user exists
        if (!user) {
            return res.status(400).json({ error: 'Unauthorized' });
        }

        // Check if the category already exists for the user
        const existingCategory = await Category.findOne({ name, user: userId });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        let img = req.file.path;
        img = img.replace('public\\uploads', 'uploads');

        const categoryImage = img;

        // Create a new category associated with the user
        const newCategory = new Category({ 
            name, 
            description,
            imgUrl: categoryImage,
            user: userId // Assign the userId to the category
        });

        await newCategory.save();



        // Add the new category's ID to the user's categoryIds array
        user.categories.push(newCategory._id); // Push the newCategory ID to categoryIds
        await user.save();

        res.json({success: true, msg: "Category has been Added"});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET route to fetch all categories
router.get('/categories', requireAuth, async (req, res) => {
    try {

        const categories = await Category.find();
        if(!categories) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({categories, success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/updatecategory/:id', requireAuth, isAdmin, upload.single('updatedCatImg'), async (req, res) => {
    try {
        const categoryId = req.params.id;
        const userId = req.user._id;

                const { name, description } = req.body;

        const user = await AdminUser.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Unauthorized' });
        }


        // Find the category by ID and user
        const category = await Category.findOne({ _id: categoryId, user: userId });

        if (!category) {
            return res.status(404).json({ error: 'Unauthorized' });
        }

        // Update the category fields
        category.name = name;
        category.description = description;

        if (req.file) {
            // Delete the previous product image if it exists
            if (category.imgUrl) {
                const imagePath = path.join(__dirname, '..', 'public', category.imgUrl);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            // Set the new image path for the updated product
            let img = req.file.path;
            img = img.replace('public\\uploads', 'uploads');
            category.imgUrl = img;
        }

        await category.save();

        res.json({ success: true, msg: 'Category updated successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete('/deletecategory/:id', requireAuth, isAdmin, async (req, res) => {
    try {
        const categoryId = req.params.id;
        const userId = req.user._id;

        const user = await AdminUser.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Unauthorized' });
        }

        // Find and delete the category by ID and user
        const deletedCategory = await Category.findOneAndDelete({ _id: categoryId, user: userId });

        if (!deletedCategory) {
            return res.status(404).json({ error: 'Unauthorized' });
        }

         // Construct the full path to the image based on the stored format
         if(deletedCategory.imgUrl) {

            const imagePath = path.join(__dirname, '..', 'public', deletedCategory.imgUrl);
    
            // Check if the file exists and then delete it
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Delete the image file
            }

         }


        // Remove the category ID from the user's categories array

        
        user.categories = user.categories.filter(catId => catId.toString() !== categoryId.toString());
        await user.save();

        res.json({ success: true, msg: 'Category deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
