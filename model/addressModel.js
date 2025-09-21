const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({

    pincode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    buildingnumber: {
        type: String,
        required: true
    },
    completeaddress: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    userId:{
        type:String,
        require:true,
        ref:'users'
    }

})

const addressModel = new mongoose.model('address', addressSchema)
module.exports = addressModel