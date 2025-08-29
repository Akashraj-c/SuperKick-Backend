const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    brandname: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    }
})

const brandModel = new mongoose.model('brands', brandSchema)
module.exports = brandModel