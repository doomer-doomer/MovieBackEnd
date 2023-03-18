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
    const [email,setEmail] = useState("")
    const [password,setPass] = useState("")
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

        // e.preventDefault();
        try { 
            const body = {email,password};  
            const response = await fetch("http://localhost:5000/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });

            const res = await response.json();
            console.log(res);
            
            localStorage.setItem('jwt_token',res.jwtToken);
            
        } catch (err) {
            console.error(err.message);
            console.log("Error in Server")
        }
        
      }

    const submitForm = (event) =>{
        event.preventDefault();
        const x = handleSubmit();
        console.log(x)
        
        // for(i in responseData){
        //     console.log(responseData[i].email);
        //     if(myemail == 'admin@gmail.com' && mypassword == 'admin'){
        //         navigate('/Admin');
        //         break;
        //     }else if(responseData[i].email == myemail && responseData[i].password == mypassword){
        //         setCookie("username",myemail,1);
        //         navigate('/Homepage');
        //         break;
        //     }else{
        //         console.log("User Not Found!")
        //     }

            
        //}
        console.log(responseData);
        
    }


    

    return(
        <div className="LoginMain">
           
           <div className="imageLogin">
                <img src="redbg.jpg"></img>
            </div>
           
            <div className="LoginLayout">
                <div className="loginlayalign">

                    <h1>Login</h1>
                    <div className="LoginContent">
                    <form onSubmit={handleSubmit}>
                        <label>Email:
                            <input
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label>Password:
                            <input
                            type="password" 
                            value={password}
                            onChange={(e) => setPass(e.target.value)}
                            />
                            
                        </label>
                        

                        <button type="submit">Submit</button>
                        <p>Create a new account?<Link to="/Signup">Signup</Link></p>
                        
                    </form>

                    </div>

                </div>
               
                

            </div>

           
        </div>
    )
}

