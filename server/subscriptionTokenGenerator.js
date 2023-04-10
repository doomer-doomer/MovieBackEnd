const jwt = require('jsonwebtoken');
require('dotenv').config;


//Add data to jwt tokken for accessing latter
function SavingPack(subscription_price,subscription_start_date,subscription_end_date){
    const payload={
        sub_price:subscription_price,
        start_date:subscription_start_date,
        end_date:subscription_end_date
    };
    return jwt.sign(payload,""+process.env.JWT_KEY,{expiresIn:"24h"});
}
module.exports = SavingPack;

function StandardPack(subscription_price,subscription_start_date,subscription_end_date){
    const payload={
        sub_price:subscription_price,
        start_date:subscription_start_date,
        end_date:subscription_end_date
    };
    return jwt.sign(payload,""+process.env.JWT_KEY,{expiresIn:"48h"});
}

module.exports = StandardPack;

function PremiumPack(user_id,subscription_start_date,subscription_end_date){
    const payload={
        user:user_id,
        start_date:subscription_start_date,
        end_date:subscription_end_date
    };
    return jwt.sign(payload,""+process.env.JWT_KEY,{expiresIn:"72h"});
}

module.exports = PremiumPack;
