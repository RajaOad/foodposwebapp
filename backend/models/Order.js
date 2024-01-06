const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true
        }
    }],
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
    deliveryDetails: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        phone: {
            type:Number,
            required: true
        }
    },
    deliveryOption: {
        type: String,
        enum: ['Delivery', 'Pickup'],
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Delivered', 'Picked Up'],
        default: 'Pending'
    },
    completionStatus: {
        type: String,
        enum: ['Not Completed', 'Completed', 'In Progress'],
        default: 'Not Completed'
    },
    cancellationStatus: {
        type: String,
        enum: ['Not Cancelled', 'Cancelled'],
        default: 'Not Cancelled'
    },
    cancelledBy: {
        type: String,
        enum: ['User', 'Admin']
    },
    cancelledAt: {
        type: Date,
    },
    completedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
