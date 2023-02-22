const jwt = require('jsonwebtoken');

const verifyUser = (req,res,next)=>{
    const token = req.header('authorization');
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verified = jwt.verify(token,process.env.SECRET_ACCESS_TOKEN);
        if(!verified) return res.status(400).send('Token Expired');
        req.user = verified;
        next();
    }catch(err){
        res.status(402).send("Failed to verify user");
        next();
    }
}

module.exports = verifyUser;