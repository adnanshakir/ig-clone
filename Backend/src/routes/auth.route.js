const express = require("express");
const authRouter = express.Router();
const identifyUser = require("../middleware/auth.middleware");
const authController = require("../controller/auth.controller");

authRouter.post("/register", authController.registerController);

authRouter.post("/login", authController.logInController);

authRouter.get("/get-me", identifyUser, authController.getMeController);

module.exports = authRouter;
