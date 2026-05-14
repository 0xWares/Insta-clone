const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const authMiddleWare = require('./../middlewares/auth.middleware') 
const upload = multer({ storage: multer.memoryStorage() })


postRouter.post("/", upload.single("imgUrl"), authMiddleWare, postController.createPostController)

postRouter.get("/", authMiddleWare , postController.getPostController)

postRouter.get("/details/:postId", authMiddleWare ,postController.getPostDetailsController)


module.exports = postRouter