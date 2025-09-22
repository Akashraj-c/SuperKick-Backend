const address = require('../model/addressModel')

// add new address
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

// get address
exports.getAddressCOntroller = async (req, res) => {
    const userId = req.payload

    try {
        const addressdata = await address.find({ userId })
        res.status(200).json(addressdata)
    } catch (error) {
        res.status(500).json(error)
    }
}

// edit address
exports.editAddressController = async (req, res) => {
    const { pincode, city, state, buildingnumber, completeaddress, fullname, phonenumber, addressId } = req.body
    console.log(pincode, city, state, buildingnumber, completeaddress, fullname, phonenumber, addressId);

    const userId = req.payload

    try {
        const editAddress = await address.findByIdAndUpdate({ _id: addressId }, { pincode, city, state, buildingnumber, completeaddress, fullname, phonenumber, userId }, { new: true })
        res.status(200).json(editAddress)
    } catch (error) {
        res.status(500).json(error)
    }
}