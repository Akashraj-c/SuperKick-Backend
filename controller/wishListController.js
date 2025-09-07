const wishList = require("../model/wishListModel")

// Add Products to wishlist
exports.addWishListController = async (req, res) => {
    const { productId } = req.body
    const userId = req.payload
    try {
        const existingProduct = await wishList.findOne({ productId, userId })
        if (existingProduct) {
            res.status(409).json('Already added to wishlist')
        }
        else {
            const newProduct = new wishList({
                userId,
                productId
            })
            await newProduct.save()
            res.status(200).json(existingProduct)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get All WishList products
exports.getAllWishlistProductController = async (req, res) => {
    const userId = req.payload

    try {
        const allproducts = await wishList.find({ userId }).populate("productId")
        res.status(200).json(allproducts)
    } catch (error) {
        res.status(500).json(error)
    }
}

// remove product from wishlist
exports.removeProductController = async (req, res) => {
    const { id } = req.params

    try {
        const removeProduct = await wishList.findByIdAndDelete({ _id: id })
        res.status(200).json(removeProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}