const Users = require('../models/users.model.js');
const { v4: uuidv4 } = require('uuid');

//  Create Task
const createUserTask = (req,res)=>{
    const user_email = req.user.name;
    console.log(user_email);
    const user = Users.findOne({email:user_email});
    if(!user) res.status(404).send({'failed': 'user doesnot exists'});
    user.updateOne(
        {email:user_email},
        {$push:{
            tasks:{
                task_id:uuidv4(),
                task_date: Date.now(),
                task_description:req.body.task,
                task_status:false
            }
        }
    }, (error, document)=>{
        if(error){
            console.log(error)
            res.status(400).send({'failed':error})
        };
        if(!document.modifiedCount) res.status(400).send({'failed':'tasks is not created'})
        res.status(200).send({'success':'task creation successful'});
    })
}

// Delete Task
const deleteUserTask = (req,res,next)=>{
    const user_email = req.user.name;
    if(req.params.task_id==undefined) res.status(400).send({'error':'request must have a valid task id'});
    console.log(req.params.task_id);
    const user = Users.findOne({email:user_email});
    if(!user) res.status(404).send({'failed': 'user doesnot exists'});
    user.updateOne(
        {email:user_email},
        {$pull:{
            tasks:{
                task_id:req.params.task_id
            }
        }
    }, (error, document)=>{
        if(error) res.status(400).send({'failed':"failed to delete the task"})
        if(!document.modifiedCount) res.status(400).send({'failed':'tasks with taskID does not exists for the current user'})
        else res.status(200).send({'success':'task deleted successfully'});
    })
}

module.exports = {
    createUserTask,
    deleteUserTask
}