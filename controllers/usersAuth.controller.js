const Users = require('../models/users.model.js');
const OTP = require('../models/opt.model.js');
const bcrypt = require('bcrypt');
const otpGen = require('otp-generator');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// user registration
const registerUser = (req,res)=>{
    const user = req.body;
        Users.findOne({email:user.email}, function(err,doc){
            if(doc==null){
                let users = new Users(user);
                users.save()
                    .then(user=>{
                        res.status(200).json({
                            'success':'User has been added successfully'
                        });
                    })
                    .catch(err=>{
                        res.status(400).json({'error':'failed to adding new user'});
                    });

            }else{
                res.status(409).json({'error':'user with the email already exists'});
            }
        })
};

//  user login
const loginUser = (req,res)=>{
    const user = req.body;
    Users.findOne({email:user.email}, async function(err, doc){
       if(doc){ 
            bcrypt.compare(user.password ,doc.password,function(err,result){
                if(result){
                    OTP.findOne({email:user.email}, function(err,doc){
                        console.log(doc);
                        if(doc==null){
                            const newOTP = otpGen.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false});
                            let optGenerated = new OTP({
                                email:user.email,
                                otp: newOTP
                            });
                            // [debuging]
                            console.log(optGenerated);
                            
                            // Saving to database;
                            optGenerated.save()
                            .then(otp=>{
                                // Sending mail 
                                console.log("send otp mail... ");
                                res.status(200).json({'success':`otp ${newOTP} send successfully and will expires in 60 seconds`})
                            })
                            .catch(err=>{
                                res.status(400).json({'error':'otp is unable to generate'});
                            })
                        }else{
                            
                                res.status(400).json({'warning':'opt is already sent'});
                        }
                    })

                }else{
                    res.status(401).json({'error':'invalid email or password'});
                }
            })
       }else{   
            res.status(409).json({'error':'user does not exists'});
       }    
    })
}

// user otp validation;
const validateOTP =(req,res)=>{
    const {email , otp} = req.body;
    OTP.findOne({email:email},async function(err,doc){
        if(doc){
            bcrypt.compare(otp,doc.otp, function(err,result){
                if(result){
                    const user = {'name':email};
                    const access_token = jwt.sign(user,process.env.SECRET_ACCESS_TOKEN,{ expiresIn: '24h' });
                    res.status(200).json({'access_token':access_token});
                }else{
                    res.status(400).json({'error':'OTP Invalid '});
                }
            })
        }else{
            res.status(400).json({'error':' OTP expired or Invalid User email id '});
        }
    })
}
module.exports = {
    registerUser,
    loginUser,
    validateOTP
}