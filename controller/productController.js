const products = require('../model/productModel')

exports.addProductCOntroller = async (req, res) => {  //Add new products
    const { category, subcategory, gender, brand, name, color, price } = req.body
    console.log(category, subcategory, gender, brand, name, color, price);

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
                category, subcategory, gender, brand, name, color, size, price, uploadedImg
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAllProductController = async (req, res) => {  //get all products
    const searchKey = req.query.search
    try {
        const allproducts = await products.find({
            $or: [
                { name: { $regex: searchKey, $options: "i" } },
                { brand: { $regex: searchKey, $options: "i" } }
            ]
        }).sort({ _id: -1 })
        res.status(200).json(allproducts)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.deleteProductController = async (req, res) => {  //Delete a product
    const { id } = req.params

    try {
        const deleteProduct = await products.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.editProductController = async (req, res) => {  //edit product
    const { category, subcategory, gender, brand, name, color, price } = req.body
    console.log(category, subcategory, gender, brand, name, color, price);

    const { id } = req.params

    let { size } = req.body;
    console.log(size);
    if (typeof size === "string") {
        size = JSON.parse(size);
    }

    uploadedImg = []
    req.files.map((items) => uploadedImg.push(items.filename))
    console.log(uploadedImg)

    try {
        const editproduct = await products.findByIdAndUpdate({ _id: id }, { category, subcategory, gender, brand, name, color, size, price, uploadedImg }, { new: true })
        res.status(200).json(editproduct)
    } catch (error) {
        res.status(500).json(error)
    }
}