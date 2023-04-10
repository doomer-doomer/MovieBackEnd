const jwt = require('jsonwebtoken');
const pool = require('./db');
require('dotenv').config({path:'C:/Users/Dell/Documents/Tejas/MoviesApp/.env'});

module.exports = async function(req,res,next){
    //get token

    const token = req.header("jwt_token");

    if(!token){
        return res.status(401).json({msg:"Authorisation Denied"});
    }

    //Verify
    try {
        const payload = jwt.verify(token,""+process.env.JWT_KEY);
        const getSubId = await pool.query("SELECT subscription_id FROM Subscriptions WHERE user_id = $1",
        [payload.user]);
        
        const newload = jwt.verify(getSubId,""+process.env.JWT_KEY)
    
        req.user = newload.user;
        next();
    } catch (error) {
        res.status(401).json({msg:"Token is not Valid!"});
    }
}