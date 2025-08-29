require('dotenv').config()
const express = require('express')
const cors = require('cors')
const route = require('./route')
require('./dbConnection')

const superKickServer = express()

superKickServer.use(cors())
superKickServer.use(express.json())
superKickServer.use(route)

const PORT = 4000 || process.env.PORT

superKickServer.listen(PORT, () => {
    console.log(`Server Running Succesfully at ${PORT}`);
})