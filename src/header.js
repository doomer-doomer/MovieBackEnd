import FetchData from "./Data"
import datas from "./datas"
import React, { useState,useEffect } from "react"
import SingleLay from "./SingleLayout"
import { Sendemail } from "./login"
import { BrowserRouter as Router,Link,Route,Routes, useNavigate } from 'react-router-dom';

export default function PageHeader(){
    const run = true
    let base_random
    let base_text
    
    const [username,set_user_name] = useState("");
    const [greet,setgreet] = useState("");

   const navigate = useNavigate();
    
    var cnum=1
    const myref = React.useRef(0)
    const themes = React.useRef()
    
    const [basetheme,setTheme] = useState()
    
    //const [loadimg,newimg] = useState([count+1])
    
    document.documentElement.style.setProperty("--theme-color", "var(--redwhite)")
    function mygetVal(val){
        document.documentElement.style.setProperty("--theme-color", "var(--"+val.target.value+ ")")
        
        console.log(val.target.value)
    }


    function greeting(){
        var today = new Date();
        var curHr = today.getHours();
        let greet;

        if (curHr < 12) {
            greet = "Good Morning";
        } else if (curHr < 18) {
            greet = "Good Afternoon";
        } else {
            greet = "Good Evening";
        }

        return greet;
    }
    


    useEffect(()=>{
        async function myusername(){
        
            try {
                const token = localStorage.getItem('jwt_token');
                if (!token) return;
                const res = await fetch("http://localhost:5000/",{
                    method:"GET",
                    headers: { Authorization: `Bearer ${token}`,
                    jwt_token: token
                },
                });
    
                if (!res.ok) throw new Error('Unauthorized');
    
                const parseRes = await res.json();
                set_user_name(parseRes.user_name);
            } catch (error) {
                console.error(error.message);
            }
            
        }

        myusername();
        setgreet(greeting);
    },[]);
   
    //document.querySelector("input[name='theme']").forEach(input => input.onChange = e => document.querySelector(":root").style.setProperty("--theme-color",'var(--${value})'));
      
    //   function getCookie(cname) {
    //     if(cname== ""){
    //         console.log("Error")
    //     }else{
    //         let name = cname + "=";
    //         let ca = document.cookie.split(';');
    //         for(let i = 0; i < ca.length; i++) {
    //         let c = ca[i];
    //         while (c.charAt(0) == ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) == 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //         }
    //         return "";
    //     }
        
    //   }
      
    //   function checkCookie() {
    //     let user = getCookie("username");
    //     if (user != "") {
    //       alert("Welcome again " + user);
    //     } else {
    //         navigate('/Login');
    //     }
    //   }

    const logout = ()=>{
        localStorage.removeItem('jwt_token');
        window.location.reload();
        
    }

    return(
        <div className="root_head">
                <div className="head">
                    <div className="navAlign">
                        <div className="navbar">
                            <img src="chillax.png" className="logo"></img>
                            <div className="user_info">
                               <h3>{greet}, {username}</h3>
                                <button onClick={logout}>Logout</button>            
                            </div>
                            
                        </div>
                    </div>
                    

<div className="cols">

        
                        <div id ="mythemes" ref={themes} className="themes">
                            
                            
                        
                            <input type="button" name="theme" className="one" value="blackyellow" onClick={mygetVal}></input>
                            <input type="button" name="theme" className="two" value="redwhite" defaultChecked onClick={mygetVal}></input>
                            <input type="button" name="theme" className="three" value="bluewhite" onClick={mygetVal}></input>
                            <input type="button" name="theme" className="four" value="orangewhite" onClick={mygetVal}></input>
                            <input type="button" name="theme" className="five" value="custom" onClick={mygetVal}></input>
                        </div>
                        
                    
                    </div>


                    

                    
                
                   
                    <div className="AllContent">
                        <FetchData/>
                    </div>
                </div>

               
                
                    
        </div>
        
    )
}