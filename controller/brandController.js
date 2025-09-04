const brands = require('../model/brandModel')

// Add brands
exports.addBrandController = async (req, res) => {
    const { brandname, imageurl } = req.body
    console.log(brandname, imageurl);

    try {
        const existingBrand = await brands.findOne({ brandname: { $regex: `^${brandname}$`, $options: 'i' } })
        if (existingBrand) {
            res.status(402).json(`${brandname} is Already Added`)
        }
        else {
            const newBrand = new brands({
                brandname, imageurl
            })
            await newBrand.save()
            res.status(200).json(newBrand)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get all brands
exports.getAllBrandCOntroller = async (req, res) => {
    const searchKey = req.query.search
    console.log(searchKey);

    try {
        const allBrands = await brands.find({ brandname: { $regex: searchKey, $options: "i" } })
        res.status(200).json(allBrands)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Delete a Brand
exports.deleteBrandController = async (req, res) => {
    const { id } = req.params
    console.log(id);

    try {
        const deleteBrand = await brands.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteBrand)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get 13 latest brands at UserHome page
exports.getHomeBrandController = async (req, res) => {
    try {
        const Homebrands = await brands.find().sort({ _id: 1 }).limit(13)
        res.status(200).json(Homebrands)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get all brands at home sideBar for filtering
exports.getAllBrandHomeCOntroller = async (req, res) => {
    try {
        const allBrands = await brands.find()
        res.status(200).json(allBrands)
    } catch (error) {
        res.status(500).json(error)
    }
}