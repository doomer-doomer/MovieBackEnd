import { BrowserRouter as Router,Link,Route,Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup(){
    const [user_name,setusername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPass] = useState("");
    const [formData,setformData] = useState(
        {}
    );

    const navigate = useNavigate();

    function reloadFun(){
        window.location.reload();
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if(user_name==="" || email === "" || password === ""){
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
            const body = {user_name,email,password};  
            const response = await fetch("http://localhost:5000/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });

            const res = await response.json();
            console.log(res);

            if(!response.ok){
                toast.warn(res, {
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
            //const token = response.jwtToken;
            localStorage.setItem('jwt_token',res.jwtToken);
            if(res.jwtToken.length>10){
                toast.success('Registeration Successful!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                setTimeout(reloadFun,3000);
            }
                
            
            
        } catch (err) {
            console.error(err.message);
            toast.error(err.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
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
            <div className="LoginLayout">
               
                <h1>Sign up</h1>
                <div className="LoginContent">
                <form onSubmit={handleSubmit}>
                    <label>Name:
                        <input
                        type="text" 
                        value={user_name}
                        onChange={(e) => setusername(e.target.value)}
                        />
                    </label>
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
                   
                    <br></br>
                    <button type="submit">Submit</button>
                    <br></br>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                    
                    
                </form>

                </div>

            </div>
        </div>
    )
}