const express = require('express');
const app = express();
require('dotenv').config;
const bcrypt = require('bcrypt');
const cors = require('cors');
const pool = require('./db');
const jwtGenerator = require('./jwtGenerator');
const validate = require('./validate');
const authorize = require('./authorize');
const { Navigate } = require('react-router-dom');

//Middleware
app.use(cors())

app.use(express.json());


//SIGN UP
app.post("/signup",validate,async(req,res)=>{
    try{

        const {email,password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const bcryptpassword = await bcrypt.hash(password,salt);

        
        const data = await pool.query("INSERT INTO MyUser4 (email,password) VALUES($1,$2) RETURNING *",
        [email,bcryptpassword]);

        //res.json(data.rows[0])

        const jwtToken = jwtGenerator(data.rows[0].user_id);
        //console.log(jwtToken);
        //res.json({jwtToken});
        return res.json("Success")
    }catch(err){
        console.log(err.message);
    }
})

//LOGIN
app.post("/login",validate,async(req,res)=>{
    try{

        const {email,password} = req.body;
        
        const data = await pool.query("SELECT email FROM MyUser4 WHERE email = $1",
        [email]);

        if(data.rows.length ===0){
            return res.status(401).json("Invalid Credentials");
        }

        const alldata = await pool.query("SELECT email,password FROM MyUser4 WHERE email = $1",[email]); 

        //res.json(alldata.rows[0].password);

        const validPassword = await bcrypt.compare(
            password,
            alldata.rows[0].password
        );

        if(!validPassword){
            return res.status(401).json("Invalid Credentials");
        }

        const jwtToken = jwtGenerator(data.rows[0].user_id);
        return res.json({jwtToken});

       
    }catch(err){
        console.log(err.message);
    }
})

app.post("/check",authorize,async(req,res)=>{
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
    }
})

//SELECT
app.get("/myurl",async(req,res)=>{
    try{
        //const {email,password} = req.body;
        
        const data = await pool.query("SELECT * FROM MyUser2");

        res.json(data.rows)
    }catch(err){
        console.log(err.message);
    }
})

//SELECT SPECIFIC
app.get("/myurl/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const data = await pool.query("SELECT * FROM MyUser2 WHERE id = $1",[id]);

        res.json(data.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

app.get("/myurl/:email/:password",async(req,res)=>{
    try{
        const {email,password} = req.params;
        const data = await pool.query("SELECT * FROM MyUser2 WHERE email = $1",[email,password]);

        res.json(data.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

//DELETE
app.delete("/myurl/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteRow = await pool.query("DELETE FROM MyUser2 WHERE id= $1",[id])

        res.json("User was deleted successfully!");
    } catch (error) {
        console.error(error.message);
    }
})

//My Port
app.listen(5000,()=>{
    console.log('Sever has been implemented Succesfully!')
})