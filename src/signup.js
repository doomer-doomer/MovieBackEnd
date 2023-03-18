import { BrowserRouter as Router,Link,Route,Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signup(){
    const [firstName,setFirstName] = useState("")
    const [lastName,setLAstName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPass] = useState("")
    const [formData,setformData] = useState(
        {}
    )

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const body = {email,password};  
            const response = await fetch("http://localhost:5000/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });

            const res = await response.json();
            console.log(res);
            const token = response.jwtToken;
            localStorage.setItem('jwt_token',res.jwtToken);
            
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
                    <img src="hide.png"></img>
                    <img src="view.png"></img>

                    <button type="submit">Submit</button>
                    
                    
                </form>

                </div>

            </div>
        </div>
    )
}