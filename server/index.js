const express = require('express');
const app = express();
require('dotenv').config({path:'C:/Users/Dell/Documents/Tejas/MoviesApp/.env'});
const bcrypt = require('bcrypt');
const cors = require('cors');
const pool = require('./db');
const jwtGenerator = require('./jwtGenerator');
const validate = require('./validate');
const authorize = require('./authorize');
const { Navigate } = require('react-router-dom');

const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

//Middleware
app.use(cors())
app.use(express.json());

//DATABASE LAYOUT

// create extension if not exists "uuid-ossp"; 
//CREATE TABLE AuthUsers(user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),user_name VARCHAR(255),email VARCHAR(255),password VARCHAR(255));
//CREATE TABLE AuthenticatedUsers(user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),user_name VARCHAR(255),email VARCHAR(255),password VARCHAR(255),user_age smallint, gender char,contact bigint,country varchar(255));

app.get("/",authorize,async(req,res)=>{
    try {
        const user = await pool.query("SELECT user_name FROM AuthenticatedUsers WHERE user_id= $1",
        [req.user]);

        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

//app.use("/dashboard", require("./server/dashboard"));

//SIGN UP
app.post("/signup",validate,async(req,res)=>{
    try{

        const {user_name,email,password,user_age,gender,contact,country} = req.body;
        const salt = await bcrypt.genSalt(10);
        const bcryptpassword = await bcrypt.hash(password,salt);

        const check = await pool.query("SELECT * FROM AuthenticatedUsers WHERE email = $1",[email]);
        
        if(check.rows.length!==0){
            return res.status(401).json("Account already found!");
        }

        
        const data = await pool.query("INSERT INTO AuthenticatedUsers (user_name,email,password,user_age,gender,contact,country) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        [user_name,email,bcryptpassword,user_age,gender,contact,country]);

        //res.json(data.rows[0])
        const jwtToken = jwtGenerator(data.rows[0].user_id);
        
        //console.log(jwtToken);
        res.json({jwtToken});
        
    }catch(err){
        console.log(err.message);
    }
})

//LOGIN
app.post("/login",validate,async(req,res)=>{
    try{

        const {email,password} = req.body;
        
        const data = await pool.query("SELECT email,password,user_id FROM AuthenticatedUsers WHERE email = $1",
        [email]);

        if(data.rows.length ===0){
            return res.status(401).json("Invalid Credentials");
        }

        //res.json(alldata.rows[0].password);

        const validPassword = await bcrypt.compare(
            password,
            data.rows[0].password
        );

        if(!validPassword){
            return res.status(401).json("Invalid Credentials");
        }

        const jwtToken = jwtGenerator(data.rows[0].user_id);
       
        
        res.json({jwtToken});

       
    }catch(err){
        console.log(err.message);
    }
})

app.post("/checkauth",authorize,async(req,res)=>{
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
    }
})

//EMAIL
app.post("/email",async(req,res)=>{
    try {
        const {email} = req.body;

        let config = {
            service : "gmail",
            auth:{
                user:"gotavadetejas2122@ternaengg.ac.in",
                pass:"kitbrfxpzcfgnzpv"
            }
        }

        let transporter = nodemailer.createTransport(config);

        let mailGenerator = new mailgen({
            theme:"default",
            product:{
                name:"Chillax",
                link:"https://mailgen.js/"
            }
        })

        let response = {
            body:{
                name:"Subscriber",
                intro:"Check out the limited deals!",
                table:{
                    data:[
                        {
                            item:"Saving Pack",
                            description:"Quality upto 720p",
                            price:"₹199"
                        },
                        {
                            item:"Standard Pack",
                            description:"Quality upto 1080p",
                            price:"₹399"
                        },{
                            item:"Premium Pack",
                            description:"Quality upto 4K",
                            price:"₹999"
                        }
                    ]
                },
                outro:"*Terms and Conditions"
               
            }
        }

        let mail = mailGenerator.generate(response);

        let message = {
            from:process.env.EMAIL,
            to:email,
            subject:"💥Chillax Deals!💥",
            html:mail
        }

        transporter.sendMail(message).then(()=>{
            return res.status(201).json({
                msg:"Email sent!"
            });
        }).catch(err=>{
            return res.status(500).json({err})
        })
    } catch (error) {
        console.error(error.message);
    }
})

//SELECT
app.get("/getuser",async(req,res)=>{
    try{
        //const {email,password} = req.body;
        
        const data = await pool.query("SELECT * FROM AuthenticatedUsers");

        res.json(data.rows)
    }catch(err){
        console.log(err.message);
        res.json("Error in Server");
    }
})

app.post("/getspecific",authorize,async(req,res)=>{
    try{
        //const {email,password} = req.body;
        
        const data = await pool.query("SELECT * FROM AuthenticatedUsers where user_id=$1",
        [req.user]);

        res.json(data.rows)
    }catch(err){
        console.log(err.message);
        res.json("Error in Server");
    }
})

app.post("/delete",async(req,res)=>{
    try {
        const {user_id} = req.body;
        const find = await pool.query("SELECT * FROM AuthenticatedUsers WHERE user_id=$1",[user_id]);
        if(find.rows.length===0){
            return res.json("Account not found!")
        }

        const response = await pool.query("DELETE FROM AuthenticatedUsers WHERE user_id= $1",[user_id]);

        res.json("Deleted Successfully");
    } catch (error) {
        console.log(error.message);
        res.json("Error in Server");
    }
})

//Update/edit user
app.post("/edit",authorize,async(req,res)=>{
    try {
        const {user_name,password,user_age,contact} = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const bcryptpassword = await bcrypt.hash(password,salt);

        const response = await pool.query("UPDATE AuthenticatedUsers SET user_name=$1,password=$2,user_age=$3,contact=$4 WHERE user_id=$5",
        [user_name,bcryptpassword,user_age,contact,req.user]);


        const mydata = await pool.query("SELECT * FROM AuthenticatedUsers WHERE user_id=$1",
        [req.user])

        const jwtToken = jwtGenerator(mydata.rows[0].user_id);
        res.json({jwtToken});
    } catch (error) {
        console.log(error.message);
        res.json("Error in Server");
    }
})

app.post("/checkemail",validate,async(req,res)=>{
    try {
        const {email} = req.body
        const check = await pool.query("SELECT * FROM AuthenticatedUsers WHERE email=$1",[email])

        if(check.rows.length===0){
            return res.json("No Account Found!");
        }

        res.json(true);

    } catch (error) {
        console.error(error.message)
        res.json("Error in server")
    }
})

app.post("/changepass",async(req,res)=>{
    try {
        const {email,password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const bcryptpassword = await bcrypt.hash(password,salt);

        const find = await pool.query("SELECT * FROM AuthenticatedUsers WHERE email=$1",[email]);
        if(find.rows.length===0){
            return res.status(500).json("Account not found!")
        }

        const changepassword = await pool.query("UPDATE AuthenticatedUsers SET password=$1 WHERE email=$2",
        [bcryptpassword,email])

        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.json("Error in server");
    }
})


//My Port
app.listen(5000,()=>{
    console.log('Sever has been implemented Succesfully!')
})