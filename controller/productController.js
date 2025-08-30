const products = require('../model/productModel')

exports.addProductCOntroller = async (req, res) => {
    const { category, subcategory, brand, name, color, price } = req.body
    console.log(category, subcategory, brand, name, color, price);

    let { size } = req.body;
    console.log(size);
    if (typeof size === "string") {
        size = JSON.parse(size);
    }

    uploadedImg = []
    req.files.map((items) => uploadedImg.push(items.filename))
    console.log(uploadedImg);

    try {
        const existingProduct = await products.findOne({ category, brand, name })
        if (existingProduct) {
            res.status(409).json('Product already added')
        }
        else {
            const newProduct = new products({
                category, subcategory, brand, name, color, size, price, uploadedImg
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}