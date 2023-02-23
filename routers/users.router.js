const express = require('express');
const userRouter = express.Router();
const verify = require("../middlewares/verifyUser.js");
const userController = require('../controllers/usersAuth.controller.js');

userRouter.route('/register').post(verify.verifyEmail,userController.registerUser);
userRouter.route('/login').post(verify.verifyEmail,userController.loginUser);
userRouter.route('/login/verify').post(verify.verifyEmail,userController.validateOTP);

module.exports = userRouter;