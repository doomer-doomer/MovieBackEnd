const jwt = require('jsonwebtoken');
const pool = require('./db');
require('dotenv').config();

module.exports = function(req,res,next){
    //get token

    const token = req.header("jwt_token");
    
    if(!token){
        return res.status(401).json({msg:"Authorisation Denied"});
    }

    //Verify
    try {
        const verify = jwt.verify(token,""+process.env.JWT_KEY);
        req.user = verify.user;
        next();
    } catch (error) {
        res.status(401).json({msg:"Token is not Valid!"});
    }
}