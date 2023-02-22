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
        res.status(200).send(document);
    })
}

// Delete Task
const deleteUserTask = (req,res)=>{
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
        res.status(200).send(document);
    })
}

module.exports = {
    createUserTask
}