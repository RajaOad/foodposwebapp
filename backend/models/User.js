const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
        default: false  // Set as false for website users
    },
    address: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''  // Add city field
    },
    zipCode: {
        type: String,
        default: ''  // Add zip code field
    },
    phone: {
        type: String,
        default: ''
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'  // Refers to the Order model
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
