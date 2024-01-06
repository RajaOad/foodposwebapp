const mongoose = require('mongoose');

const adminUserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: ''
    },
    bannerBg: {
        type: String,
        default: ''  // URL for the banner background image
    },
    isAdmin: {
        type: Boolean,
        default: true  // Set as true for admin users
    },
    sales: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sale'
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

module.exports = AdminUser;
