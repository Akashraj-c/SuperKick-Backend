const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        type: Map,
        of: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    uploadedImg: {
        type: Array,
        required: true
    }

})

const productModel = new mongoose.model('products', productSchema)
module.exports = productModel