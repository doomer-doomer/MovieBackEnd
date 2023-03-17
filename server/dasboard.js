const router = require("express").Router();
const auth = require('../server/authorize');
const pool = require('../server/db');

router.post("/",auth,async(req,res)=>{
    try {
        const user = await pool.query(
            "SELECT email FROM MyUser4 WHERE user_id = $1",
            [req.user.id])

            res.json(user.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})