const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Importing the Order model
const User = require('../models/User'); // Importing the Order model
const Sale = require("../models/Sale");
const isAdmin = require("../middleware/isAdmin");
const requireAuth = require('../middleware/authMiddleware');
const AdminUser = require('../models/Admin'); // AdminUser model

router.post('/placeorder', requireAuth, async (req, res) => {
    try {
      const userId = req.user._id;
  
      const { products, totalQuantity, totalItems, grandTotal, deliveryDetails, deliveryOption } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Unauthorized' });
      }
  
      const orderItems = products.map(product => ({
        productId: product.product,
        quantity: product.quantity,
        totalPrice: product.totalPrice
      }));
  
      const newOrder = new Order({
        userId,
        products: orderItems,
        totalItems,
        totalQuantity,
        grandTotal,
        deliveryDetails,
        deliveryOption
      });
  
      await newOrder.save();

          // Update user's sales array with new sale ID
    user.orders.push(newOrder._id);
    await user.save();
    
  
      res.json({ success: true, msg: "Order placed successfully!" });
  
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/orders', requireAuth, async (req, res) => {
    const userId = req.user._id;
    
    try {
        const orders = await Order.find({ userId })
            .populate('userId') 
            .populate('products.productId');

            if (!orders) {
              return res.status(404).json({ error: 'No orders found', success: false });
          }
        
        res.json({ orders, success: true });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Fetch order by user ID and order ID
router.get('/orders/:orderId', requireAuth, async (req, res) => {
  const userId = req.user._id;
  const orderId = req.params.orderId;
  
  try {

      const order = await Order.findOne({ _id: orderId, userId: userId })
      .populate('userId') 
      .populate('products.productId');
      
      if (!order) {
          return res.status(404).json({ error: 'Order not found', success: false });
      }
      
      res.json({ order, success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to cancel an order
router.put('/order/cancel/:orderId', requireAuth, async (req, res) => {
  const userId = req.user._id;
  const orderId = req.params.orderId;
  try {
    const order = await Order.findOne({ _id: orderId, userId: userId })

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.cancellationStatus !== 'Not Cancelled') {
      return res.status(400).json({ error: 'Order is already canceled' });
    }

    if (order.completionStatus === 'Completed') {
      return res.status(400).json({ error: 'Order is completed and cannot be canceled' });
    }


    order.cancellationStatus = 'Cancelled';
    order.cancelledBy = 'User';
    order.cancelledAt = new Date();

    await order.save();

    res.status(200).json({ msg: 'Order canceled successfully', success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







  router.get('/admin/orders', requireAuth, isAdmin, async (req, res) => {
    const userId = req.user._id;
    
    try {
        const user = await AdminUser.findById(userId);

        if (!user) {
          return res.status(404).json({ error: 'Unauthorized' });
      }

        const orders = await Order.find()
            .populate('userId') 
            .populate('products.productId');

            if (!orders) {
              return res.status(404).json({ error: 'No orders found', success: false });
          }
        
        res.json({ orders, success: true });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Fetch order by ID

router.get('/admin/order/:orderId', requireAuth, isAdmin, async (req, res) => {
    const orderId = req.params.orderId;
    
    try {
        // Update the query to find an order by both userId and orderId
        const order = await Order.findOne({ _id: orderId })
        .populate('userId') 
        .populate('products.productId');
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found', success: false });
        }
        
        res.json({ order, success: true });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.put('/admin/order/cancel/:orderId', requireAuth, isAdmin, async (req, res) => {
    const orderId = req.params.orderId;
    try {
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      if (order.cancellationStatus !== 'Not Cancelled') {
        return res.status(400).json({ error: 'Order is already canceled' });
      }

      if (order.completionStatus === 'Completed') {
        return res.status(400).json({ error: 'Order is completed and cannot be canceled' });
      }
  
      order.cancellationStatus = 'Cancelled';
      order.cancelledBy = 'Admin';
      order.cancelledAt = new Date();
  
      await order.save();
  
      res.status(200).json({ msg: 'Order canceled successfully', success: true });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Route to complete an order
  router.put('/admin/order/complete/:orderId', requireAuth, isAdmin, async (req, res) => {
    const userId = req.user._id;
    const orderId = req.params.orderId;
    try {
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      if (order.completionStatus !== 'Not Completed') {
        return res.status(400).json({ error: 'Order is already completed' });
      }

      if (order.cancellationStatus === 'Cancelled') {
        return res.status(400).json({ error: 'Order is canceled and cannot be completed' });
      }
  
      order.completionStatus = 'Completed';
      order.completedAt = new Date();

  
      await order.save();

      if(order.completionStatus === "Completed") {
        const user = await AdminUser.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Unauthorized' });
  }

    // Convert products to sale items
    const saleItems = order.products.map(product => ({
      product: product.productId, // Assuming product is the ID of the product
      quantity: product.quantity,
      totalPrice: product.totalPrice
    }));

    // Create a new sale instance
    const newSale = new Sale({
      items: saleItems,
      totalQuantity: order.totalQuantity,
      totalItems: order.totalItems,
      grandTotal: order.grandTotal,
      user: userId // Associate the sale with the authenticated user
    });

    // Save the new sale to the database
    await newSale.save();
    
    // Update user's sales array with new sale ID
    user.sales.push(newSale._id);
    await user.save();
      }
  
      res.status(200).json({ msg: 'Order completed successfully', success: true });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

   
  router.put('/admin/order/update/:orderId', requireAuth, isAdmin, async (req, res) => {
    try {
        const userId = req.user._id
      const orderId = req.params.orderId;
      const updatedData = req.body;
  
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }



      if(updatedData.completionStatus === "Completed") {

        if (order.completionStatus !== 'Not Completed') {
            return res.status(400).json({ error: 'Order is already completed' });
          }
    
          if (order.cancellationStatus === 'Cancelled') {
            return res.status(400).json({ error: 'Order is canceled and cannot be completed' });
          }
      

        order.completedAt = new Date();

        const user = await AdminUser.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Unauthorized' });
  }

    // Convert products to sale items
    const saleItems = updatedData.products.map(product => ({
      product: product.productId, // Assuming product is the ID of the product
      quantity: product.quantity,
      totalPrice: product.totalPrice
    }));

    // Create a new sale instance
    const newSale = new Sale({
      items: saleItems,
      totalQuantity: updatedData.totalQuantity,
      totalItems: updatedData.totalItems,
      grandTotal: updatedData.grandTotal,
      user: userId // Associate the sale with the authenticated user
    });

    // Save the new sale to the database
    await newSale.save();
    
    // Update user's sales array with new sale ID
    user.sales.push(newSale._id);
    await user.save();
      }

      if(updatedData.cancellationStatus === "Cancelled") {
        if (order.cancellationStatus !== 'Not Cancelled') {
            return res.status(400).json({ error: 'Order is already canceled' });
          }
    
          if (order.completionStatus === 'Completed') {
            return res.status(400).json({ error: 'Order is completed and cannot be canceled' });
          }
        order.cancelledBy = 'Admin';
        order.cancelledAt = new Date();
      }



  
      // Update the order fields based on the updatedData
      // Example: 
      order.products = updatedData.products;
      order.totalQuantity= updatedData.totalQuantity;
      order.totalItems = updatedData.totalItems;
      order.grandTotal = updatedData.grandTotal;
      order.deliveryDetails = updatedData.deliveryDetails;
      order.deliveryOption = updatedData.deliveryOption;
      order.status = updatedData.status;
      order.completionStatus = updatedData.completionStatus;
      order.cancellationStatus = updatedData.cancellationStatus;



      await order.save();
  
      res.status(200).json({ success: true, msg: 'Order updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
    

  router.delete('/admin/order/delete/:orderId', requireAuth, isAdmin, async (req, res) => {
    try {
      const orderId = req.params.orderId;
  
      // Find and delete the order by its ID
      const deletedOrder = await Order.findByIdAndDelete(orderId);
  
      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Remove the order ID from the user's orders array (if you have such a setup)
      const user = await User.findById(deletedOrder.userId);
      if (user) {
        user.orders = user.orders.filter(id => id.toString() !== orderId);
        await user.save();
      }
  
      res.status(200).json({ success: true, msg: 'Order deleted successfully' });
  
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


module.exports = router;
