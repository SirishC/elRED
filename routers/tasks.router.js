const express = require('express');
const taskRouter = express.Router();
const verify = require("../middlewares/verifyUser.js");
const taskController = require('../controllers/usersTask.controller.js');

taskRouter.route('/create').post(verify,taskController.createUserTask);
taskRouter.route('/delete/:task_id').delete(verify,taskController.deleteUserTask);
taskRouter.route('/getTasks').get(verify,taskController.getUserTasks);
taskRouter.route('/updateTask').patch(verify,taskController.updateUserTask);

module.exports = taskRouter;