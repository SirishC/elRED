const express = require('express');
const taskRouter = express.Router();
const verify = require("../middlewares/verifyUser.js");
const taskController = require('../controllers/usersTask.controller.js');

taskRouter.route('/create').post(verify.verifyAccess,taskController.createUserTask);
taskRouter.route('/delete/:task_id').delete(verify.verifyAccess,taskController.deleteUserTask);
taskRouter.route('/getTasks').get(verify.verifyAccess,taskController.getUserTasks);
taskRouter.route('/updateTask').patch(verify.verifyAccess,taskController.updateUserTask);
taskRouter.route('/sort').get(verify.verifyAccess,taskController.sortTask);
taskRouter.route('/sortByUser').post(verify.verifyAccess,taskController.sortByUser);
module.exports = taskRouter;