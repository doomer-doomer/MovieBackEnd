import FetchData from "./Data"
import datas from "./datas"
import React, { useState,useEffect } from "react"
import SingleLay from "./SingleLayout"
import { BrowserRouter as Router,Link,Route,Routes } from 'react-router-dom';

export default function PageHeader(){
    const run = true
    let base_random
    let base_text
    
   
    
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
   
    //document.querySelector("input[name='theme']").forEach(input => input.onChange = e => document.querySelector(":root").style.setProperty("--theme-color",'var(--${value})'));
    

    return(
        <div className="root_head">
                <div className="head">
                    <div className="navAlign">
                        <div className="navbar">
                            <img src="logo.png" className="logo"></img>
                            <Link to="/login"><h3>Login</h3></Link>
                    


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