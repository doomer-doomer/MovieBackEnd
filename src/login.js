import { useEffect, useState } from "react"
import { BrowserRouter as Router,Link,Route,Routes } from 'react-router-dom';
import FinalLayout from "./FinalLayout";
import { useNavigate } from "react-router-dom";
import FetchData from "./Data";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    function reloadFun(){
        window.location.reload();
    }

    const handleSubmit = async e => {

         e.preventDefault();
         if(email==="" || password===""){
            toast.warn('Insufficient Credentials!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                return;
         }
        try { 
            const body = {email,password};  
            const response = await toast.promise(fetch("http://localhost:5000/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            }),{
                pending:"Verifying credentials",
                success:"Login Successful!",
                error:"Something went wrong!"
            });

            const res = await response.json();
            console.log(res);

            // if(!response.ok){
            //     toast.warn(res, {
            //         position: "top-center",
            //         autoClose: 3000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: false,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "colored",
            //         });
            //         return;
            // }
            
            
            localStorage.setItem('jwt_token',res.jwtToken);
            if(res.jwtToken.length>10){
                setTimeout(reloadFun,3000);
            }
            
            
        } catch (err) {
            console.error(err.message);
            console.log("Error in Server")
            toast.error(err.message, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            
        }
        
      }

    

    return(
        <div className="LoginMain">
           <ToastContainer
           
           />
          
           <div className="imageLogin">
                <img src="redbg.jpg"></img>
            </div>
            <div className="LoginLayout">
                
                <div className="loginlayalign">

                    
                    <div className="LoginContent">
                    <h1>Welcome Back!</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <label>Email
                            <input
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label>Password
                            <input
                            type="password" 
                            value={password}
                            onChange={(e) => setPass(e.target.value)}
                            />
                            
                        </label>
                        
                        <br></br><br></br>
                        <button type="submit">Submit</button>
                        <p>Create a new account?<Link to="/Signup">Signup</Link></p>
                        
                    </form>

                    </div>

                </div>
               
                

            </div>

           
        </div>
    )
}

