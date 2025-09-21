const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    quantuty: {
        type: Number,
        default: 1
    },
    size: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true,
        ref: "products"
    }
})

const cartModel = new mongoose.model('cart Products', cartSchema)
module.exports = cartModel