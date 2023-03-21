const router = require("express").Router();
const auth = require('../server/authorize');
const pool = require('../server/db');

// router.get("/",auth,async(req,res)=>{
//     try {
//         const user = await pool.query(
//             "SELECT * FROM MyUser4")

//         res.json(user);
        
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Server Error");
//     }
// })