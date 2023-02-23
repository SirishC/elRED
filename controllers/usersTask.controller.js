const Users = require('../models/users.model.js');
const { v4: uuidv4 } = require('uuid');

//  Create Task
const createUserTask = (req,res)=>{
    const user_email = req.user.name;
    const user = Users.findOne({email:user_email});
    if(!user) res.status(404).send({'error': 'user does not exists'});
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
            res.status(500).send({'error':'failed to create tasks'})
        };
        if(!document.modifiedCount) res.status(500).send({'error':'tasks is not created'})
        res.status(201).send({'success':'task creation successful'});
    })
}

// Delete Task
const deleteUserTask = (req,res)=>{
    const user_email = req.user.name;
    if(req.params.task_id==undefined) res.status(400).send({'error':'request must have a valid task id'});
    console.log(req.params.task_id);
    const user = Users.findOne({email:user_email});
    if(!user) res.status(404).send({'error': 'user does not exists'});
    user.updateOne(
        {email:user_email},
        {$pull:{
            tasks:{
                task_id:req.params.task_id
            }
        }
    }, (error, document)=>{
        if(error) res.status(500).send({'error':"failed to delete the task"})
        if(!document.modifiedCount) res.status(404).send({'error':'tasks with taskID does not exists for the current user'})
        else res.status(200).send({'success':'task deleted successfully'});
    })
}


// get user tasks 

const getUserTasks = (req,res)=>{
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const start = ( page - 1) * limit;

    const user_email = req.user.name;
    const user = Users.find(
        {email:user_email},
        {tasks:{$slice: [start, limit]},_id:0},
        (error,document)=>{
        if(error) res.status(404).send({'error':'user does not exists'});
        else{
            res.status(200).send(document[0].tasks);
        }
    });

}

// update tasks 

const updateUserTask = (req,res) =>{
    if(!req.body.task_id) res.status(400).send({'error':'task_id need to be send'});
    else{
    const user_email = req.user.name;
    const user = Users.findOne({email:user_email});
    if(!user) res.status(404).send({'error': 'user does not exists'});
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
            res.status(500).send({'error':'failed to update the tasks'})
        };
        if(!document.modifiedCount) res.status(404).send({'error':'task with task id does not exists'});
        else res.status(200).send({'success':'task updation successful'});
    })
    }

}


// sort tasks by latest update

const sortTask = (req,res)=>{
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const start = ( page - 1) * limit;
    if(page==null ^ limit==null) res.status(400).send({'error':'missing page limit'})

    const user_email = req.user.name;
    const user = Users.findOne({email:user_email});
    if(!user) res.status(404).send({'error': 'user does not exists'});
    user.updateOne(
        {email:user_email},
        {$push:{
            tasks:{
                $each:[],
                $sort:{task_updated_date:-1}
            }
        }
    }, (error, document)=>{
        console.log(document)
        if(error){
            console.log(error)
            res.status(400).send({'error':"failed to sort task by latest updated"});
        };
        if(!document.modifiedCount) res.status(400).send({'error':'task list failed to update'})
        Users.find(
            {email:user_email},
            {tasks:{$slice: [start, limit]},_id:0},
            (error,document)=>{
            if(error) res.status(404).send({'error':'tasks records not found !'});
            else{
                res.status(200).send(document[0].tasks);
            }
        });
    })

}

// Sort By User Order
const sortByUser = (req,res)=>{
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const start = ( page - 1) * limit;

    const user_email = req.user.name;
    Users.findOne({email:user_email},(error,document)=>{
        if(error) res.status(404).send({'error': 'user does not exists'});
        let tasks = document.tasks;
        let taskids = req.body.tasks;
        console.log(taskids)
        const user_reordered_list = []; 
        for( var i =0;i<taskids.length;i++){
            for(var j=0;j<tasks.length;j++){
                if(tasks[j].task_id===taskids[i]){
                    user_reordered_list.push(tasks[j]);
                }

            }
        }
        if(taskids.length < tasks.length){
            for(var i=0;i<tasks.length;i++){
                if(!taskids.includes(tasks[i].task_id)){
                    user_reordered_list.push(tasks[i]);
                }
            }
        }

        Users.updateOne(
            {email:user_email},
            {
                $set:{tasks:user_reordered_list}
            },(error,document)=>{
                if(error) res.status(500).send({"error":"task sort has not been updated"});
                Users.find(
                    {email:user_email},
                    {tasks:{$slice: [start, limit]},_id:0},
                    (error,document)=>{
                    if(error) res.status({'error':'failed to get tasks'});
                    else{
                        res.status(200).send(document[0].tasks);
                    }
                });
            })
        
        });
        

}

module.exports = {
    createUserTask,
    deleteUserTask,
    getUserTasks,
    updateUserTask,
    sortTask,
    sortByUser
}