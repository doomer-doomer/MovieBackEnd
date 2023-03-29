import { useEffect, useState } from "react"
import { BrowserRouter as Router,Link,Route,Routes } from 'react-router-dom';
import FinalLayout from "./FinalLayout";
import { useNavigate } from "react-router-dom";
import FetchData from "./Data";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login(){
    const [email,setEmail] = useState("")
    const [password,setPass] = useState("")

    const navigate = useNavigate();

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
         if(email ==="admin@host.com" && password ==="admin"){
            navigate('/admin');
            return;
         }
        try { 
            const body = {email,password};  
            const response = await toast.promise(fetch("http://localhost:5000/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            }),{
                pending:"Verifying credentials...",
                success:"Connected to Database",
                error:"Something went wrong!"
            });

            const res = await response.json();
            console.log(res);

            if(!response.ok){
                toast.warn(res, {
                    position: "bottom-left",
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
            
            
            localStorage.setItem('jwt_token',res.jwtToken);
            if(res.jwtToken.length>10){
                    toast.success("Login successful!", {
                        position: "bottom-left",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        })
                        
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
          <div className='mainilogoimg'>
            <img src='chillax.png'></img>
           </div>
           <div className="imageLogin">
                <img src="loginbg.jpg"></img>
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
                        
                        <label>Password
                            <input
                            type="password" 
                            value={password}
                            onChange={(e) => setPass(e.target.value)}
                            />
                            
                        </label>
                        
                        <br></br>
                        <br></br>
                        <Button type="submit">Submit</Button>
                        <p>Create a new account?<Link to="/Signup">Signup</Link></p>
                        
                    </form>

                    </div>

                </div>
               
                

            </div>

           
        </div>
    )
}

