const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user.controller");
const identifyUser = require("../middleware/auth.middleware");

userRouter.post("/follow/:username", identifyUser, userController.followController);
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowController);
userRouter.patch("/follow/:username", identifyUser, userController.statusController);

module.exports = userRouter;
