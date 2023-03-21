const jwt = require('jsonwebtoken');
require('dotenv').config;


//Add data to jwt tokken for accessing latter
function jwtGenerator(user_id){
    const payload={
        user:user_id
    };
    return jwt.sign(payload,""+process.env.JWT_KEY,{expiresIn:"1h"});
}

module.exports = jwtGenerator;