const cart = require('../model/cartModel')

// add new cart product
exports.addCartController = async (req, res) => {
    const { productId, size } = req.body
    console.log(productId, size);
    const userId = req.payload

    try {
        const existingProduct = await cart.findOne({ productId, userId, size })
        if (existingProduct) {
            res.status(402).json('Product already added')
        }
        else {
            const newProduct = new cart({
                productId, size, userId
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

// get all cart products
exports.getAllCartController = async (req, res) => {
    const userId = req.payload

    try {
        const allproducts = await cart.find({ userId }).populate("productId")
        res.status(200).json(allproducts)
    } catch (error) {
        res.status(500).json(error)
    }
}

// remove product from cart
exports.removeProductCartController = async (req, res) => {
    const { id } = req.params
    console.log(id);

    try {
        const deleteProduct = await cart.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}