const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const OTP = new Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    expireAt:{
        type:Date,
        default: Date.now,
        index:{expires:'1m'},
    }
})
OTP.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(8);
        const hashedOTP =  await bcrypt.hashSync(this.otp,salt);
        this.otp= hashedOTP;
        next();
    }catch(err){
        next(err);
    }
})

module.exports = mongoose.model('OTP', OTP);