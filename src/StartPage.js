import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StartPage(){

    const navigate = useNavigate();
    const [email,setemail] = useState("");

    const handleSubmit = async e=>{
        let respo 
        e.preventDefault();
        if(email===""){
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
            const body = {email};
            const response = await toast.promise(fetch("http://localhost:5000/email",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            }),{
                pending:"Sending email",
                success:"Email sent Successfully!",
                error:"Something went wrong",
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })

            const res = await response.json();
            

            if(!response.ok){
                return;
            }

            
            
        } catch (error) {
            console.error(error.message);
            toast.error('Server Error!', {
                position: "top-center",
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

    const teleport = ()=>{
        navigate('/login');
    }

    return (
        <div className="starpgbody">
            <ToastContainer
               
            />
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

                                    <form onSubmit={handleSubmit}>
                                        <label>
                                            <input
                                            type="email" 
                                            value={email}
                                            placeholder="Email"
                                            onChange={(e) => setemail(e.target.value)}
                                            />
                                        </label>
                                        
                                        <button type="submit">Submit</button>
                                    </form>
                                    
                    </div>
                    

                               
                </div>
                
                </div>
                
                

        </div>
    )
}