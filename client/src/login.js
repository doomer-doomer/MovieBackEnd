import { useEffect, useState } from "react"
import { BrowserRouter as Router,Link,Route,Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login(){
    const [email,setEmail] = useState("")
    const [password,setPass] = useState("")
    const [newpass,setnewpass] = useState("")
    const [checkemail,setcheckmail] = useState(false)

    const [size,setsize] = useState("md")

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false)
    setcheckmail(false)
    setsize("md")};
    const handleShow = () => setShow(true);

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

      const checkmymail = async event =>{
        event.preventDefault()
        if(email ===""){
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
            return
        }
        try {
            const body = {email};  
            const response = await toast.promise(fetch("http://localhost:5000/checkemail",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            }),{
                pending:"Verifying credentials...",
                success:"Connected to Database",
                error:"Something went wrong!"
            });

            const res = await response.json();
            if(res === true){
                setcheckmail(true)
                setsize("lg")
                toast.success("Email Found✔️", {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    })
            }
            
            if(res === "No Account Found!"){
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
                return
            }

        
        } catch (error) {
            toast.error("Error in Server", {
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

      const forgotpassword = async event=>{
            event.preventDefault()
            if(password !== newpass || password==="" || newpass===""){
                toast.warn('Passwords are not matching!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                return
            }
            try {
                const body = {email,password};  
                const response = await toast.promise(fetch("http://localhost:5000/changepass",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(body)
                }),{
                    pending:"Verifying credentials...",
                    success:"Connected to Database",
                    error:"Something went wrong!"
                });

                const res = await response.json();
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
                    return
                }

                if(res===true){
                    toast.success("Password Updated Successfully!", {
                        position: "bottom-left",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        })
                    handleClose()
                }
            } catch (error) {
                console.error(error.message);
                toast.error("Error in Server", {
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

                <Modal show={show} onHide={handleClose} centered size={size}>
                    <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <div className="forgetformlay" >
                                <form onSubmit={checkmymail} className="emailform">
                                    <label>Email:<input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your Email"
                                    /></label>

                                    <button type="submit">Check Email</button>
                                </form>

                                {checkemail && <div>
                                        <hr></hr>
                                        <form onSubmit={forgotpassword} className="passwordform">
                                        <label>New Password:<input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPass(e.target.value)}
                                            placeholder="Enter password"
                                        /></label>
                                        <label>Retype Password:<input
                                            type="password"
                                            value={newpass}
                                            onChange={(e) => setnewpass(e.target.value)}
                                            placeholder="Enter password again"
                                        /></label>
                                        <button type="submit">Reset Password</button>
                                        </form>
                                    </div>}


                            </div>
            
                        </Modal.Body>
                </Modal>
              


                    
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
                        <Button type="submit">Login</Button>
                        
                    </form>
                    <p>Create a new account?<br></br><Link to="/Signup">Signup</Link></p>
                    <button onClick={handleShow}>Forgot Password?</button>

                    </div>

                </div>
               
                

            </div>

           
        </div>
    )
}

