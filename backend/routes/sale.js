const express = require("express");
const Sale = require("../models/Sale");
const requireAuth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();
const AdminUser = require('../models/Admin'); // AdminUser model

router.get('/sales', requireAuth, isAdmin, async (req, res) => {
  try {
    // Populate items with the referenced 'product' in each sale item
    const sales = await Sale.find().populate('items.product');
    if(!sales) {
      return res.status(404).json({ error: 'Sales not found' });
    }
    res.json({sales, success: true});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Make a sale for the authenticated user
router.post('/makesale', requireAuth, isAdmin, async (req, res) => {
  try {
    const userId = req.user._id;

    const { products, totalItems, totalQuantity, grandTotal } = req.body;

    const user = await AdminUser.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Unauthorized' });
  }

    // Convert products to sale items
    const saleItems = products.map(product => ({
      product: product.product, // Assuming product is the ID of the product
      quantity: product.quantity,
      totalPrice: product.totalPrice
    }));

    // Create a new sale instance
    const newSale = new Sale({
      items: saleItems,
      totalItems,
      totalQuantity,
      grandTotal,
      user: userId // Associate the sale with the authenticated user
    });

    // Save the new sale to the database
    await newSale.save();
    
    // Update user's sales array with new sale ID
    user.sales.push(newSale._id);
    await user.save();
    
    res.json({ success: true, msg: "Sale completed successfully!" });
    
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/sale/:id', requireAuth, isAdmin, async (req, res) => {
  try {
    
    const sale = await Sale.findOne({ _id: req.params.id }).populate('items.product');
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json({sale, success: true});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/updatesale/:id', requireAuth, isAdmin, async (req, res) => {
  try {
    const userId = req.user._id;
    const saleId = req.params.id;
    const { items, totalQuantity, totalItems, grandTotal } = req.body;

    const sale = await Sale.findById(saleId);

    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }

    const user = await AdminUser.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Unauthorized' });
  }

  if (sale.user.toString() !== userId.toString()) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

    // Find the sale by its ID and update its fields
    const updatedSale = await Sale.findByIdAndUpdate(
      saleId,
      {
        items,
        totalItems,
        totalQuantity,
        grandTotal
      },
      { new: true } // Return the updated sale after the update
    );

    if (!updatedSale) {
      return res.status(404).json({ error: 'Failed to update sale' });
    }

    res.json({ success: true, msg: 'Sale updated successfully!' });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/deletesale/:saleId', requireAuth, isAdmin, async (req, res) => {
  try {
    const userId = req.user._id;
    const saleId = req.params.saleId;

    // Find the sale by its ID
    const sale = await Sale.findById(saleId);

    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }

    const user = await AdminUser.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Unauthorized' });
  }

    if (sale.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Remove the sale ID from the associated user's sales array
    user.sales = user.sales.filter(s => s.toString() !== saleId); // Assuming sales is an array of ObjectIDs
    await user.save();

        // Find the sale by ID and delete it
         await Sale.findByIdAndDelete(saleId);

    res.json({ success: true, msg: 'Sale deleted successfully!' });
    
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
