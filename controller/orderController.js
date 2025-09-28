const order = require('../model/orderModel')

// add allcart products to orders after payment
exports.addOrderProductController = async (req, res) => {
    const { products, address, totalAmount } = req.body
    console.log(products, address, totalAmount);

    const userId = req.payload
    try {
        const orderedProducts = new order({
            userId,
            products,
            addressId: address,
            totalAmount
        })
        await orderedProducts.save()
        res.status(200).json(orderedProducts)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get all orders of a particular user
exports.getAllOrderProductController = async (req, res) => {
    const userId = req.payload
    console.log(userId);
    
    try {
        const allOrders = await order.find({ userId }).populate('products.productId').populate('addressId').sort({ _id: -1 })
        res.status(200).json(allOrders)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get all orders at admin page
exports.getAllOrderAdminProductController = async (req, res) => {
    const userId = req.payload

    try {
        const allOrders = await order.find().populate('products.productId').populate('addressId').sort({ _id: -1 })
        res.status(200).json(allOrders)
    } catch (error) {
        res.status(500).json(error)
    }
}