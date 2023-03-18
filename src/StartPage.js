import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function StartPage(){

    const navigate = useNavigate();
    const [email,setemail] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        alert(email);
    }

    const teleport = ()=>{
        navigate('/login');
    }

    return (
        <div className="starpgbody">
            <div className="headerstartpg">
                <img src="chillax.png"></img>
                <button onClick={teleport}>Login</button>
            </div>
            <div className="startpgLay">
                <img src="redbg.jpg" width="100%"></img>
            </div>

            <div className="slogan">
                <h1>Creating memories through entertainment that stays forever.</h1>

            </div>

                <div className="emailBox">

                <div className="emailForm">
                    <p>Enter your email to create or subscribe for updates</p>
                    <div className="innerForm">

                                <form>
                                        <label>
                                            <input
                                            type="email" 
                                            value={email}
                                            placeholder="Email"
                                            onChange={(e) => setemail(e.target.value)}
                                            />
                                        </label>
                                        
                                        
                                    </form>
                                    <button type="button" onClick={handleSubmit}>Submit</button>
                    </div>
                    

                               
                </div>
                
                </div>
                
                

        </div>
    )
}