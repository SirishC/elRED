const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/users.controller.js');

userRouter.route('/register').post(userController.registerUser);
userRouter.route('/login').post(userController.loginUser);
userRouter.route('/login/verify').post(userController.validateOTP);

module.exports = userRouter;