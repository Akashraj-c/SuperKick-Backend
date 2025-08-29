const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then((res) => {
    console.log('MongoDB Connected Succesfully');

}).catch((err) => {
    console.log(`MongoDb Connection Failed due to ${err}`);

})