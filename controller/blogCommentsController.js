const comments = require('../model/commentModel')

// Add new comment
exports.addCommentController = async (req, res) => {
    const { commentData, blogId, userName } = req.body
    console.log(commentData, blogId, userName);

    const userId = req.payload
    console.log(userId);

    try {
        const exsistingComment = await comments.findOne({ userId, blogId })
        if (exsistingComment) {
            res.status(402).json('Already commented')
        }
        else {
            const newComment = new comments({
                comment: commentData,
                blogId,
                userId,
                userName
            })
            await newComment.save()
            res.status(200).json(newComment)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// get all comments of a particular blog
exports.getAllCommentController = async (req, res) => {
    const { id } = req.params
    console.log(id);

    try {
        const allComments = await comments.find({ blogId: id }).sort({ _id: -1 })
        res.status(200).json(allComments)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get all comments of blogs
exports.getCommentsController = async (req, res) => {

    try {
        const allComments = await comments.find()
        res.status(200).json(allComments)
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete comment
exports.deleteCommentController = async (req, res) => {
    const { id } = req.params
    console.log(id);

    try {
        const deleteComment = await comments.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteComment)
    } catch (error) {
        res.status(500).json(error)
    }
}