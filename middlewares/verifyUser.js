const jwt = require('jsonwebtoken');

const verifyAccess = (req,res,next)=>{
    const token = req.header('authorization');
    if(!token) return res.status(403).send({'error':'Access to this endpoint is restricted'});
    try{
        const verified = jwt.verify(token,process.env.SECRET_ACCESS_TOKEN);
        if(!verified) return res.status(401).send('Invalid Token or Token Expired');
        req.user = verified;
        next();
    }catch(err){
        res.status(401).send({'error':'unauthorized request'});
        next();
    }
}
const verifyEmail = (req,res,next)=>{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if( req.body.email.match(validRegex)){
        next();
    }else{
        return res.status(400).send({'error':'invalid email entry'});
    }
}

module.exports = {
    verifyAccess,
    verifyEmail
};