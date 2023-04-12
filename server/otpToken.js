const jwt = require('jsonwebtoken');
require('dotenv').config;


//Add data to jwt tokken for accessing latter
function otpGenerator(otp){
    const payload={
        otp:otp
    };
    return jwt.sign(payload,""+process.env.JWT_KEY,{expiresIn:"5m"});
}

module.exports = otpGenerator;