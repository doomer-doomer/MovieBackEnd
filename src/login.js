import { useEffect, useState } from "react"
import { BrowserRouter as Router,Link,Route,Routes } from 'react-router-dom';
import FinalLayout from "./FinalLayout";
import { useNavigate } from "react-router-dom";
import FetchData from "./Data";

export function Sendemail(prop){
    return(
        <div>{prop.user}</div>
    )
}

export default function Login(){

    const [firstName,setFirstName] = useState("")
    const [lastName,setLAstName] = useState("")
    const [myemail,setEmail] = useState("")
    const [mypassword,setPass] = useState("")
    const [formData,setformData] = useState(
        {}
    )
    const navigate = useNavigate();

    const [success,setsuccess]= useState(false)

    let responseData

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    const handleSubmit = async e => {
        

        try { 
            const response = await fetch("http://localhost:5000/login");
            responseData = await response.json();
            console.log(responseData);
        } catch (err) {
            console.error(err.message);
            console.log("Error in Server")
        }
        
      }

    const submitForm = (event) =>{
        event.preventDefault();
        let i
        for(i in responseData){
            console.log(responseData[i].email);
            if(myemail == 'admin@gmail.com' && mypassword == 'admin'){
                navigate('/Admin');
                break;
            }else if(responseData[i].email == myemail && responseData[i].password == mypassword){
                setCookie("username",myemail,1);
                navigate('/Homepage');
                break;
            }else{
                console.log("User Not Found!")
            }
            
        }
        
    }

      useEffect(()=>{
        handleSubmit();
      },[]);

    

    return(
        <div className="LoginMain">
           
            <div className="LoginLayout">
               
                <h1>Login</h1>
                <div className="LoginContent">
                <form>
                    <label>Email:
                        <input
                        type="email" 
                        value={myemail}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>Password:
                        <input
                        type="password" 
                        value={mypassword}
                        onChange={(e) => setPass(e.target.value)}
                        />
                        
                    </label>
                    <img src="hide.png"></img>
                    <img src="view.png"></img>

                    <button type="button" onClick={submitForm}>Submit</button>
                    <p>Create a new account?<Link to="/Signup">Signup</Link></p>
                    
                </form>

                </div>

            </div>
        </div>
    )
}

