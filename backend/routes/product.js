const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const Category = require("../models/Category");
const requireAuth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const User = require("../models/User");
const fs = require('fs');
const path = require('path');
const upload = require('../config/multerConfig');
const AdminUser = require('../models/Admin'); // AdminUser model

// Get products
router.get('/products', requireAuth, async (req, res) => {
  try {

      const products = await Product.find().populate('category');

      if (!products) {
        return res.status(404).json({ error: 'Products not found' });
    }

      res.json(products);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new product for the authenticated user
router.post('/addproduct', requireAuth, isAdmin, upload.single('productImage'), async (req, res) => {
  try {
    const userId = req.user._id;


      const { name, price, categoryId, description } = req.body;

      // Validate input fields
      if (!name || !price || !categoryId) {
          return res.status(400).json({ error: 'Name, price, and category are required.' });
      }

      // Check if the provided categoryId exists in the database
      const existingCategory = await Category.findById(categoryId);
      if (!existingCategory) {
          return res.status(400).json({ error: 'Invalid category.' });
      }

      let img = req.file.path;
      img = img.replace('public\\uploads', 'uploads');

      // Create a new product with the user ID associated
      const newProduct = new Product({ 
          name, 
          price, 
          description, 
          imageUrl: img, // Assuming multer saves the path in req.file.path
          category: categoryId,
          user: userId // Attach the user's ID from the authenticated request
      });
      
      // Save the new product
      await newProduct.save();

        // Update the user's products array with the new product ID
        const user = await AdminUser.findById(userId);
        user.products.push(newProduct._id); // Assuming newProduct has been saved and has a valid _id
        await user.save();

      res.json({success: true, msg: 'Product has been Added'});
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



// PUT route to update a product by its ID
router.put('/updateproduct/:productId', requireAuth, isAdmin, upload.single('updatedImage'), async (req, res) => {
  const productId = req.params.productId; 
  const userId = req.user._id; 

  const { name, price, description, categoryId } = req.body; 

  try {
      // Find the product by its ID
      const product = await Product.findById(productId);

      // Check if product exists
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }

      // Find the authenticated user by userId
      const user = await AdminUser.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'Unauthorized' });
    }

      // Check if the product's userId matches with the authenticated user's ID
      if (product.user.toString() !== userId.toString()) {
          return res.status(403).json({ error: 'Unauthorized' });
      }

    

              // Create an empty object to store updated fields
              const newProduct = {};

              // Check and set fields if provided by the user
              if (name !== undefined) {
                  newProduct.name = name;
              }
      
              if (description !== undefined) {
                  newProduct.description = description;
              }
      
              if (price !== undefined) {
                  newProduct.price = price;
              }

              if (categoryId !== undefined) { // assuming categoryId is the new category ID sent by the user
                newProduct.category = categoryId;
              }
      
              if (req.file) {
                // Delete the previous product image if it exists
                if (product.imageUrl) {
                    const imagePath = path.join(__dirname, '..', product.imageUrl);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }
                // Set the new image path for the updated product
                let img = req.file.path;
      img = img.replace('public\\uploads', 'uploads');
                newProduct.imageUrl = img;
            }
      

      // Update product fields using findByIdAndUpdate
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: newProduct },
        { new: true } // Return the updated document
    );

      // Check if product was updated successfully
      if (!updatedProduct) {
          return res.status(500).json({ error: 'Failed to update product' });
      }

      res.json({ success: true, msg: 'Product updated successfully.' });

  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});




// DELETE route to delete a product by its ID
router.delete('/deleteproduct/:productId', requireAuth, isAdmin, async (req, res) => {
    const productId = req.params.productId; // Get productId from route params
    const userId = req.user._id; // Get authenticated userId from req

    try {
        // Find the product by its ID
        const product = await Product.findById(productId);

        // Check if product exists
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Find the authenticated user
        const user = await AdminUser.findById(userId);

        if (!user) {
          return res.status(404).json({ error: 'Unauthorized' });
      }


        // Check if the user's productIds includes the productId
        if (product.user.toString() !== userId.toString()) {
          return res.status(403).json({ error: 'Unauthorized' });
        }

        if(product.imageUrl) {

                   // Construct the full path to the image based on the stored format
         const imagePath = path.join(__dirname, '..', product.imageUrl);
 
         // Check if the file exists and then delete it
         if (fs.existsSync(imagePath)) {
             fs.unlinkSync(imagePath); // Delete the image file
         }

        }


        // Remove the productId from the user's productIds array
        user.products = user.products.filter(id => id.toString() !== productId);

        // Save the updated user object
        await user.save();

        // Delete the product from the database
        await Product.findByIdAndDelete(productId);
        res.json({ success: true, msg: 'Product deleted successfully.' });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/categories/:categoryName/products', requireAuth, async (req, res) => {
  try {
      const userId = req.user._id;
      const categoryName = req.params.categoryName;

      // Find the category by its name
      const category = await Category.findOne({ name: categoryName });

      if (!category) {
          return res.status(404).json({ error: 'Category not found' });
      }

      // Fetch products based on the category's ID
      const products = await Product.find({ category: category._id }).populate('category');

      if (!products) {
          return res.status(404).json({ error: 'Products not found for this category' });
      }

      res.json({ products, category, success: true });
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports = router;
