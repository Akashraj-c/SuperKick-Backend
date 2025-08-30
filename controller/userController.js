const users = require('../model/userModel')
const jwt = require('jsonwebtoken')

// register
exports.registerController = async (req, res) => {
    const { username, email, password } = req.body
    console.log(username, email, password);

    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            res.status(409).json('User already exists')
        } else {
            const newUser = new users({
                username,
                email,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// login
exports.userLoginController = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({ userMail: existingUser.email }, 'secretKey')
                res.status(200).json({ token, existingUser })
            }
            else {
                res.status(401).json('Please verify your password and try again.')
            }
        } else {
            res.status(404).json('Account not found. Please register before logging in.')
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// Google Login
exports.googleLoginController = async (req, res) => {
    const { username, email, password, profile } = req.body
    console.log(username, email, password, profile);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const token = jwt.sign({ userMail: existingUser.email }, 'secretKey')
            res.status(200).json({ existingUser, token })
        }
        else {
            const newUser = new users({
                username,
                email,
                password,
                profile
            })
            await newUser.save()
            const token = jwt.sign({ userMail: newUser.email }, 'secretKey')
            res.status(200).json({ newUser, token })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}