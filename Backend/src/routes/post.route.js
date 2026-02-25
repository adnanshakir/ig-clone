const express = require("express");
const postRouter = express.Router();
const postController = require("../controller/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middleware/auth.middleware");

// Upload posts
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

// Get your all posts
postRouter.get("/", identifyUser, postController.getPostController);

// Get the specific post but only if its yours
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailController,
);

// Like a post
postRouter.post(
  "/like/:postId",
  identifyUser,
  postController.likePostController,
);

// Feed
postRouter.get("/feed", identifyUser, postController.getFeedController)

module.exports = postRouter;
