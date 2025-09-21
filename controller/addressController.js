const address = require('../model/addressModel')

exports.addAddressController = async (req, res) => {
    const { pincode, city, state, buildingnumber, completeaddress, fullname, phonenumber } = req.body
    console.log(pincode, city, state, buildingnumber, completeaddress, fullname, phonenumber);

    const userId = req.payload
    console.log(userId);

    try {
        const existingAddress = await address.findOne({ userId })
        if (existingAddress) {
            res.status(402).json('address already added')
        }
        else {
            const newAddres = new address({
                pincode, city, state, buildingnumber, completeaddress, fullname, phonenumber, userId
            })
            await newAddres.save()
            res.status(200).json(newAddres)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAddressCOntroller = async (req, res) => {
    try {
        const addressdata = await address.find()
        res.status(200).json(addressdata)
    } catch (error) {
        res.status(500).json(error)
    }
}