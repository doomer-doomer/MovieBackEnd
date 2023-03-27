import FetchData from "./Data"
import React, { useState,useEffect } from "react"
export default function PageHeader(){
    
    const [username,set_user_name] = useState("");
    const [greet,setgreet] = useState("");

    const themes = React.useRef()

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
                               <button>Edit Profile</button>
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