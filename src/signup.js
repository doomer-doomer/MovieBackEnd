import { BrowserRouter as Router,Link,Route,Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signup(){
    const [user_name,setusername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPass] = useState("");
    const [formData,setformData] = useState(
        {}
    );

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const body = {user_name,email,password};  
            const response = await fetch("http://localhost:5000/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });

            const res = await response.json();
            console.log(res);
            //const token = response.jwtToken;
            localStorage.setItem('jwt_token',res.jwtToken);
            if(res.jwtToken.length>10){
                window.location.reload();
            }
                
            
            
        } catch (err) {
            console.error(err.message)
        }
        
      }

    return(
        <div className="LoginMain">
           
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