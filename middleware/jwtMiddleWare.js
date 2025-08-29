const jwt = require("jsonwebtoken")

const jwtMiddleWare = async (req, res, next) => {
    console.log('inside jwt middleware');
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try {
        const response = jwt.verify(token, 'secretKey')
        console.log(response);
        req.payload = response.userMail
        next()
    } catch (error) {
        res.status(401).json(`invalid token`, error)
    }

}


module.exports = jwtMiddleWare