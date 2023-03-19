const Pool = require('pg').Pool;
//Your .env loaction 
require('dotenv').config({path:'C:/Users/Suvarna/Desktop/TEJAS/React/moviestreamingpp/.env'})
const pool = new Pool({
    user:process.env.USER_NAME,
    password:""+process.env.PASSWORD,
    host:process.env.HOST,
    port:process.env.PORT,
    database:process.env.DATATBASE
});

module.exports = pool;