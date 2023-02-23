const mongoose = require('mongoose');
require('dotenv').config();
const nodemailer = require('nodemailer');
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

        //  Sending OTP Mail
        console.log("Sending OTP Mail");
        new Promise((resolve,reject)=>{
            const transporter = nodemailer.createTransport({
                service:'hotmail',
                auth:{
                    user:process.env.SENDER_EMAIL,
                    pass:process.env.SENDER_PASSWORD
                }
            });
            const options={
                from:process.env.SENDER_EMAIL,
                to:this.email,
                subject:"OTP verification",
                text:`your OTP verification code is ${this.otp}`
            }
            transporter.sendMail(options,async function(err, result){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    console.log("Sent OTP to "+ result.response);
                    resolve();
                }
            })
        })

        // Hashing OTP and Saving for verification.
        const salt = await bcrypt.genSalt(8);
        const hashedOTP =  await bcrypt.hashSync(this.otp,salt);
        this.otp= hashedOTP;
        next();
    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = mongoose.model('OTP', OTP);