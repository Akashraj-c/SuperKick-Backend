const blog = require('../model/blogModel')

// Add new Blog
exports.addBlogController = async (req, res) => {
    const { title, subtitle, description, category } = req.body
    console.log(title, subtitle, description, category);

    const uploadImg = req.file.filename

    try {
        const existingBlog = await blog.findOne({ title, category })
        if (existingBlog) {
            res.status(402).json('Blog already added')
        }
        else {
            const newBlog = new blog({
                title, subtitle, description, category, image: uploadImg
            })
            await newBlog.save()
            res.status(200).json(newBlog)
        }
    } catch (error) {
        res.status(500).json(error)
    }

}

// Get All blog
exports.getAllBlogController = async (req, res) => {
    try {
        const allBlogs = await blog.find().sort({ _id: -1 })
        res.status(200).json(allBlogs)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Delete a blog
exports.deleteABlogController = async (req, res) => {
    const { id } = req.params
    console.log(id);

    try {
        const deleteBlog = await blog.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteBlog)
    } catch (error) {
        res.status(500).json(error)
    }

}

// Get a Blog details
exports.getABlogDetailsController = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const blogDetails = await blog.findById({ _id: id })
        res.status(200).json(blogDetails)
    } catch (error) {
        res.status(200).json(error)
    }
}