const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: String,
            ref: "products",
            required: true
        },
        size: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    addressId: {
        type: String,
        ref: 'address',
        required: true
    },
}, { timestamps: true })

const orderModel = new mongoose.model('orders', orderSchema)
module.exports = orderModel