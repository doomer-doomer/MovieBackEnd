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
const SavingPack = require('./subscriptionTokenGenerator');
const subscribeAuth = require('./subscribeAuth');

//Middleware
app.use(cors())
app.use(express.json());

//DATABASE LAYOUT

// create extension if not exists "uuid-ossp"; 
//CREATE TABLE AuthUsers(user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),user_name VARCHAR(255),email VARCHAR(255),password VARCHAR(255));
//CREATE TABLE AuthenticatedUsers(user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),user_name VARCHAR(255),email VARCHAR(255),password VARCHAR(255),user_age smallint, gender char,contact bigint,country varchar(255));

//CREATE TABLE Subscriptions AS SELECT user_id FROM AuthenticatedUsers;
//ALTER TABLE Subscriptions ADD subscription_id VARCHAR(255) NOT NULL DEFAULT 'Not Subscribed';
//ALTER TABLE Subscriptions ADD subscription_name varchar(255) NULL;
//ALTER TABLE Subscriptions ADD subscription_price smallint NOT NULL DEFAULT 0;
//ALTER TABLE Subscriptions ADD subscription_start_date varchar(255) NOT NULL DEFAULT current_date;
//ALTER TABLE Subscriptions ADD subscription_end_date varchar(255) NOT NULL DEFAULT current_date+30;

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

        const new_subscriber = await pool.query("INSERT INTO subscriptions (user_id) VALUES($1)",
        [data.rows[0].user_id])
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

app.post("/subscribe",authorize,async(req,res)=>{
    try {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        const current_date = `${day}-${month}-${year}`;
        const one_month_subscription = `${day}-${date.getMonth()+1+1}-${year}`;
        const three_month_subscription = `${day}-${date.getMonth()+1+3}-${year}`;
        const year_month_subscription = `${day}-${date.getMonth()+1}-${date.getFullYear()+1}`;

        // This arrangement can be altered based on how we want the date's format to appear.
        const {subscription_name,subscription_price} = req.body;

        if(subscription_price===199 || subscription_name==="Saving Pack"){
            const token = SavingPack(subscription_price,current_date,one_month_subscription)
            const data = await pool.query("UPDATE subscriptions SET user_id=$1,subscription_id=$2,subscription_price=$3,subscription_start_date=$4,subscription_end_date=$5,subscription_name=$6 WHERE user_id=$7",
            [req.user,token,subscription_price,current_date,one_month_subscription,subscription_name,req.user]);

            return res.json("Subcription Successful!");
        }
        if(subscription_price===399 || subscription_name==="Standard Pack"){
            const token = SavingPack(subscription_price,current_date,one_month_subscription)
            const data = await pool.query("UPDATE subscriptions SET user_id=$1,subscription_id=$2,subscription_price=$3,subscription_start_date=$4,subscription_end_date=$5,subscription_name=$6 WHERE user_id=$7",
            [req.user,token,subscription_price,current_date,three_month_subscription,subscription_name,req.user]);

            return res.json("Subcription Successful!");
        }
        if(subscription_price===999 || subscription_name==="Premium Pack"){
            const token = SavingPack(subscription_price,current_date,one_month_subscription)
            const data = await pool.query("UPDATE subscriptions SET user_id=$1,subscription_id=$2,subscription_price=$3,subscription_start_date=$4,subscription_end_date=$5,subscription_name=$6 WHERE user_id=$7",
            [req.user,token,subscription_price,current_date,year_month_subscription,subscription_name,req.user]);

            return res.json("Subcription Successful!");
        }

        res.json("Something is wrong")
        
    } catch (error) {
        console.error(error.message);
        res.json(error.message);
    }
})

app.post('/subscriptionCheck',subscribeAuth,async(req,res)=>{
    try {
        res.json(true)
    } catch (error) {
        console.error(error.message);
    }
})

app.post('/subscriberData',authorize,async(req,res)=>{
    try {
        const data = await pool.query("SELECT subscription_id FROM subscriptions WHERE user_id=$1",
        [req.user]);

        res.json(data.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

app.post('/subscriberAllData',authorize,async(req,res)=>{
    try {
        const data = await pool.query("SELECT * FROM subscriptions WHERE user_id=$1",
        [req.user]);

        res.json(data.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})


//My Port
app.listen(5000,()=>{
    console.log('Sever has been implemented Succesfully!')
})