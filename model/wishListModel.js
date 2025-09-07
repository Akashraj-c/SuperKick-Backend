const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true,
        ref: "products"
    }
})

const wishListModel = new mongoose.model('wishList Products', wishListSchema)
module.exports = wishListModel