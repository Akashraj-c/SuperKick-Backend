const express = require('express')
const userController = require('./controller/userController')
const brandController = require('./controller/brandController')
const productController = require('./controller/productController')
const jwtMiddleWare = require('./middleware/jwtMiddleWare')
const multerConfig = require('./middleware/multerMiddleWare')
const route = express.Router()

// --------user--------
route.post('/register', userController.registerController) //user Register
route.post('/login', userController.userLoginController) //user login
route.post('/googleLogin', userController.googleLoginController) //user google login
route.get('/gethomebrands', brandController.getHomeBrandController) //get limited brands at UserHome page

// --------Admin--------
route.post('/addbrands', jwtMiddleWare, brandController.addBrandController) // Add brands
route.delete('/deletebrand/:id', brandController.deleteBrandController) //Delete brand
route.post('/addproduct', jwtMiddleWare, multerConfig.array('uploadedImg', 5), productController.addProductCOntroller) //Add new Product


// --------Common--------
route.get('/allbrands', brandController.getAllBrandCOntroller) //Get all brands

module.exports = route