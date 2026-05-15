const express = require('express')
const userController = require('./../controllers/user.controller')
const identifyUser = require('./../middlewares/auth.middleware')

const userRouter = express.Router()

userRouter.post('/follow/:userName', identifyUser, userController.userFollowController)
userRouter.post('/unfollow/:userName', identifyUser, userController.userUnfollowController)

module.exports = userRouter