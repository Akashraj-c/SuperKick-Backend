const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    blogId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }

}, { timestamps: true })

const commentModel = new mongoose.model('blog_Comments', commentSchema)
module.exports = commentModel