import { useState } from "react"
import { BrowserRouter as Router,Link,Route,Routes } from 'react-router-dom';

export default function Login(){

    const [firstName,setFirstName] = useState("")
    const [lastName,setLAstName] = useState("")
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
    const [formData,setformData] = useState(
        {}
    )

    console.log(formData)

    //var pg = require('pg')
    //var connect = "postgres://"+ process.env.REACT_APP_USER_NAME + ":" + process.env.REACT_APP_PASSWORD+"@"+process.env.REACT_APP_HOST +"/ip:"+ process.env.REACT_APP_PORT+"/MovieAppUsers"
    //var pgClient = new pg.Client(connect)
    //pgClient.connect()

    


    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ` +email + " "+pass)
        
      }

    return(
        <div className="LoginMain">
           
            <div className="LoginLayout">
               
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
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        />
                        
                    </label>
                    <img src="hide.png"></img>
                    <img src="view.png"></img>

                    <button type="submit">Submit</button>
                    <p>Create a new account?<Link to="/Signup">Signup</Link></p>
                    
                </form>

                </div>

            </div>
        </div>
    )
}