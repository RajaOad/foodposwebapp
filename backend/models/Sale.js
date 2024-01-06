const mongoose = require("mongoose");

const saleItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

const saleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: {
    type: [saleItemSchema],
    required: true
  },
  totalQuantity: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
},
  grandTotal: {
    type: Number,
    required: true
  },
  saleDate: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
