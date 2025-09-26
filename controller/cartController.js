const cart = require('../model/cartModel')
const Razorpay = require('razorpay');
const crypto = require('crypto')

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

// update quantity
exports.updatePrdtQty = async (req, res) => {
    const { id, qty } = req.body
    console.log(id, qty);

    try {
        const updateQty = await cart.findByIdAndUpdate({ _id: id }, { $inc: { quantuty: qty } }, { new: true })
        res.status(200).json(updateQty)
    } catch (error) {
        res.status(500).json(error)
    }
}

// create order
exports.createOrderController = async (req, res) => {
    const { amount, currency } = req.body
    // console.log(amount, currency);

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    try {
        const options = {
            amount: amount * 100,
            currency: currency || "INR",
            receipt: "receipt_" + Date.now()
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
}

// verify order
exports.verifyOrderController = async (req, res) => {
    const { order_id, payment_id, signature } = req.body
    // console.log(order_id, payment_id, signature);

    try {
        const sign = order_id + "|" + payment_id; //create expected signature
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign).digest("hex");

        // Compare signatures
        if (signature === expectedSign) {
            res.status(200).json("Payment verified successfully")
            // return res.json({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(402).json("Invalid signature")
            // return res.status(400).json({ success: false, message: "Invalid signature" });
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

// delete all products from cart after payment
exports.removeAllCartProductsController = async (req, res) => {
    const { allCartIds } = req.body
    console.log(allCartIds);

    const userId = req.payload
    console.log(userId);

    try {
        const deleteProducts = await cart.deleteMany({ userId, _id: { $in: allCartIds } })
        res.status(200).json(deleteProducts)
    } catch (error) {
        res.status(500).json(error)
    }

}