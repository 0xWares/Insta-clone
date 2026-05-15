const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const identifyUser = require('./../middlewares/auth.middleware') 
const upload = multer({ storage: multer.memoryStorage() })


postRouter.post("/", upload.single("imgUrl"), identifyUser, postController.createPostController)

postRouter.get("/", identifyUser , postController.getPostController)

postRouter.get("/details/:postId", identifyUser ,postController.getPostDetailsController)

/**

@Router Post /api/posts/like/:postId
@Description Like a post with id provided with required checks

**/

postRouter.post('/like/:postId', identifyUser, postController.likePostController)




module.exports = postRouter