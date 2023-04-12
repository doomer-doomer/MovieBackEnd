const jwt = require('jsonwebtoken');
const pool = require('./db');
require('dotenv').config({path:'C:/Users/Dell/Documents/Tejas/MoviesApp/.env'});

module.exports = function(req,res,next){
    //get token

    const token = req.header("otp_token");
    
    if(!token){
        return res.status(401).json({msg:"Authorisation Denied"});
    }

    //Verify
    try {
        const payload = jwt.verify(token,""+process.env.JWT_KEY);
        req.user = payload.user;
        next();
    } catch (error) {
        res.status(401).json({msg:"Token is not Valid!"});
    }
}