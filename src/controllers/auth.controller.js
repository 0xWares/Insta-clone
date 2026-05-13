const userModel = require('./../model/user.model')
const cookie = require('cookie-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerController(req, res) {
    const { userName, email, password, bio, profileImage } = req.body
    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { userName },
            { email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: (isUserAlreadyExists.email === email ? "User already exists with this email" : "User name already exists")
        })
    }
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        userName, email, password: hash, bio, profileImage
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
            email: user.email,
            userName: user.userName,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })

}

async function loginController(req, res) {
    const { userName, email, password } = req.body
    console.log("Query conditions:", { userName, email })
    const user = await userModel.findOne({
        $or: [
            {
                userName: userName
            },
            {
                email: email
            }
        ]
    })
    if (!user) {
        return res.status(404).json({
            message: "User is not registered"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: 'Password is invalid'
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie('jwt_token', token)

    res.status(200).json({
        message: "User logged in",
        user: {
            email: user.email,
            userName: user.userName,
            bio: user.bio,
            profileImage: user.profileImage
        },
        token
    })
}

module.exports = {
    registerController,
    loginController
}