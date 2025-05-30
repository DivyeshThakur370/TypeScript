const express = require("express");
const { signupController, signinController } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/signup", signupController);
userRouter.post("/signin", signinController);
module.exports = userRouter;
