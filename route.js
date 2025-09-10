const express = require('express')
const userController = require('./controller/userController')
const brandController = require('./controller/brandController')
const productController = require('./controller/productController')
const wishListController = require('./controller/wishListController')
const blogController = require('./controller/blogController')
const commentController = require('./controller/blogCommentsController')
const jwtMiddleWare = require('./middleware/jwtMiddleWare')
const multerConfig = require('./middleware/multerMiddleWare')
const route = express.Router()

// --------user--------
route.post('/register', userController.registerController) //user Register
route.post('/login', userController.userLoginController) //user login
route.post('/googleLogin', userController.googleLoginController) //user google login
route.get('/gethomebrands', brandController.getHomeBrandController) //get limited brands at UserHome page
route.get('/allSneakers', productController.getAllSneakerController) //get all sneakers at sneaker page 
route.get('/allApparels', productController.getAllApparelController) //get all Apparels at apparel page
route.get('/allhomebrands', brandController.getAllBrandHomeCOntroller) //get all brands at home sidebar for filtering
route.get('/AProductDetails/:id', productController.getAProductController) //get details of a particular product
route.get('/menproducts', productController.getAllMensProductController) //get all mens products
route.get('/womenproducts', productController.getAllWomensProductController) //get all women products
route.post('/addWishList', jwtMiddleWare, wishListController.addWishListController) //add new product to wishlist
route.get('/getallproducts', jwtMiddleWare, wishListController.getAllWishlistProductController) //get all wishlist products
route.delete('/removeproduct/:id', wishListController.removeProductController) // Remove product from wishlist
route.get('/getABlog/:id', blogController.getABlogDetailsController) //get a blog details
route.post('/addcomment', jwtMiddleWare, commentController.addCommentController) //post a comment for a particular blog 

// --------Admin---------
route.post('/addbrands', jwtMiddleWare, brandController.addBrandController) //Add brands
route.delete('/deletebrand/:id', brandController.deleteBrandController) //Delete brand
route.post('/addproduct', jwtMiddleWare, multerConfig.array('uploadedImg', 5), productController.addProductCOntroller) //Add new Product
route.delete('/deleteproduct/:id', productController.deleteProductController) //Delete product
route.put('/editprodcut/:id', multerConfig.array('uploadedImg', 5), productController.editProductController) //Edit product
route.post('/addblog', jwtMiddleWare, multerConfig.single('image'), blogController.addBlogController) //Add blogs
route.get('/getallblogs', blogController.getAllBlogController) //Get all blogs
route.delete('/deleteblog/:id', jwtMiddleWare, blogController.deleteABlogController) //Delete a blogs
route.get('/getallcomments', commentController.getCommentsController) //get all comments of blogs 
route.delete(`/deletecomment/:id`, commentController.deleteCommentController) //delete a comment

// --------Common--------
route.get('/allbrands', brandController.getAllBrandCOntroller) //Get all brands
route.get('/allproducts', productController.getAllProductController) //Get all products
route.get('/allcomments/:id', commentController.getAllCommentController) //get all comments of a particular blog 


module.exports = route