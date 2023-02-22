const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Users = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tasks: [{
        task_id:{
            type:String,
            required:true
        },
        task_date:{
            type:Date,
            required:true
        },
        task_description:{
            type:String,
            required:true
        },
        task_status:{
            type:Boolean,
            required:true
        }
    }
    ]
})

Users.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        console.log(this.password)
        const hashedPassword = await bcrypt.hashSync(this.password , salt);
        this.password = hashedPassword;
        next();
    }catch(err){
        next(err);
    }
})

module.exports = mongoose.model('Users',Users);