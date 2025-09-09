const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }

}, { timestamps: true })

const blogModel = new mongoose.model('blogs', blogSchema)
module.exports = blogModel