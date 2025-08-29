const express = require('express')
const userController = require('./controller/userController')
const brandController = require('./controller/brandController')
const jwtMiddleWare = require('./middleware/jwtMiddleWare')
const route = express.Router()

// --------user--------
route.post('/register', userController.registerController) //user Register
route.post('/login', userController.userLoginController) //user login
route.post('/googleLogin', userController.googleLoginController) //user google login
route.get('/gethomebrands', brandController.getHomeBrandController) //get limited brands at UserHome page

// --------Admin--------
route.post('/addbrands', jwtMiddleWare, brandController.addBrandController) // Add brands
route.delete('/deletebrand/:id', brandController.deleteBrandController) //Delete brand

// --------Common--------
route.get('/allbrands', brandController.getAllBrandCOntroller) //Get all brands

module.exports = route