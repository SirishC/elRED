const Users = require('../models/users.model.js');
const { v4: uuidv4 } = require('uuid');

//  Create Task
const createUserTask = (req,res)=>{
    const user_email = req.user.name;
    const user = Users.findOne({email:user_email});
    if(!user) res.status(404).send({'failed': 'user doesnot exists'});
    user.updateOne(
        {email:user_email},
        {$push:{
            tasks:{
                task_id:uuidv4(),
                task_description:req.body.task,
                task_status:false,
                task_created_date: Date.now(),
                task_updated_date: Date.now()
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
const deleteUserTask = (req,res)=>{
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


// get user tasks 

const getUserTasks = (req,res)=>{
    const user_email = req.user.name;
    const user = Users.findOne({email:user_email},(error,document)=>{
        if(error) res.status({'failed':'user doesnot exists'});
        else{
            res.status(200).send(document.tasks);
        }
    });

}

// update tasks 

const updateUserTask = (req,res) =>{
    if(!req.body.task_id) res.status(400).send({'error':'task_id need to be send'});
    else{
    const user_email = req.user.name;
    const user = Users.findOne({email:user_email});
    if(!user) res.status(404).send({'failed': 'user doesnot exists'});
    user.updateOne(
        {
            email:user_email,
            'tasks.task_id':req.body.task_id
        },
        { 
            $set: { 
                "tasks.$.task_description":req.body.task_description,
                "tasks.$.task_status":req.body.task_status,
                "tasks.$.task_updated_date":Date.now()
            } 
        },
   
   (error, document)=>{
        if(error){
            console.log(error)
            res.status(400).send({'failed':'Failed to update the  tasks'})
        };
        if(!document.modifiedCount) res.status(400).send({'failed':'task with task id does not exists'});
        else res.status(200).send({'success':'task updation successful'});
    })
    }

}

module.exports = {
    createUserTask,
    deleteUserTask,
    getUserTasks,
    updateUserTask
}