// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    imageUrl: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,  // This references the ID of a Category document
        ref: 'Category',  // This tells Mongoose which model to use during population
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
