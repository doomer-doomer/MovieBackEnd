import FetchData from "./Data"
import React, { useState,useEffect } from "react"
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PageHeader(){
    
    const [modalShow, setModalShow] = useState(false);

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [currentusername,set_user_name] = useState("");
    
    const [greet,setgreet] = useState("");

    const themes = React.useRef()

    document.documentElement.style.setProperty("--theme-color", "var(--redwhite)")
    function mygetVal(val){
        document.documentElement.style.setProperty("--theme-color", "var(--"+val.target.value+ ")")
        
        console.log(val.target.value)
    }

    const [user_name,setusername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPass] = useState("");
    const [user_age,setage] = useState("");
    const [gender,setgender] = useState("");
    const [contact,setcontact] = useState("");
    const [country,setcountry] = useState("");

    const getData=async (event)=>{
        try {
            const token = localStorage.getItem('jwt_token');
            if (!token) return;
            const res = await fetch("http://localhost:5000/getspecific",{
                method:"POST",
                headers: { Authorization: `Bearer ${token}`,
                jwt_token: token
            },
            });
    
            if (!res.ok){
                toast.warn(res, {
                  position: "bottom-left",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  });
              }
    
            const response = await res.json();
            setusername(response[0].user_name);
            setage(response[0].user_age);
            setEmail(response[0].email);
            //setPass(response[0].password);
            setgender(response[0].gender);
            setcontact(response[0].contact);
    
        } catch (error) {
            console.log(error.message);
            toast.error(error.message, {
                position: "bottom-left",
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

    
    function reloadFun(){
        window.location.reload();
    }
    


    function greeting(){
        var today = new Date();
        var curHr = today.getHours();
        let greet;

        if (curHr < 12) {
            greet = "Good Morning";
        } else if (curHr < 18) {
            greet = "Good Afternoon";
        } else {
            greet = "Good Evening";
        }

        return greet;
    }
    
    const handleSubmit = async e => {
        e.preventDefault();
        if(user_name==="" || contact === "" || password === ""){
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
            const token = localStorage.getItem('jwt_token');
            if (!token) return;
            const body = {user_name,password,user_age,contact};  
            const response = await toast.promise(fetch("http://localhost:5000/edit",{
                method:"POST",
                headers:{"Content-Type":"application/json", Authorization: `Bearer ${token}`,jwt_token: token},
                body:JSON.stringify(body)
            }),{
                pending:"Checking credentials...",
                success:"Connecting to Database",
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
                    return;
            }
            
            localStorage.setItem('jwt_token',res.jwtToken);
            if(res.jwtToken.length>10){
                toast.success("Profile Updated Successfully!", {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                myusername();
                //setTimeout(reloadFun,3000);
            };
                
            
            
        } catch (err) {
            console.error(err.message);
            toast.error(err.message, {
                position: "bottom-left",
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

    async function myusername(){
        
        try {
            const token = localStorage.getItem('jwt_token');
            if (!token) return;
            const res = await fetch("http://localhost:5000/",{
                method:"GET",
                headers: { Authorization: `Bearer ${token}`,
                jwt_token: token
            },
            });

            if (!res.ok) throw new Error('Unauthorized');

            const parseRes = await res.json();
            set_user_name(parseRes.user_name);
        } catch (error) {
            console.error(error.message);
        }
        
    }


    useEffect(()=>{

        myusername();
        setgreet(greeting);
        getData();
    },[]);
   

    const logout = ()=>{
        localStorage.removeItem('jwt_token');
        window.location.reload();
    }

    const editprofile =()=>{
        setModalShow(true);
    }
    return(

        
        <div className="root_head">
                <div className="head">
                    <div className="navAlign">
                        <div className="navbar">
                            <img src="chillax.png" className="logo"></img>
                            <div className="user_info">
                                <div className="user_detailz">
                                <h3>{greet}, {currentusername}</h3>
                                <h5>{email}</h5>
                                </div>
                                
                                <button onClick={handleShow}>Edit Profile</button>
                                <button onClick={logout}>Logout</button>            
                            </div>
                            
                        </div>
                    </div>

                    
                    <Modal show={show} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className="editform">

            <form onSubmit={handleSubmit}>
                    <label>Username <input className="inp1"
                        type="text"
                        value={user_name}
                        onChange={(e) => setusername(e.target.value)}
                        placeholder="Change Username"
                    /></label>

                    
                    <label>Password <input className="inp2"
                        type="password"
                        value={password}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Change Password"
                    /></label>
                    <label>Age  <input className="inp3"
                        type="number"
                        value={user_age}
                        onChange={(e) => setage(e.target.value)}
                        placeholder="Change Age"
                    /></label>
                    
                    <label>Contact <input className="inp4"
                        type="number"
                        value={contact}
                        onChange={(e) => setcontact(e.target.value)}
                        placeholder="Change Contact"
                    /></label>


<Button variant="Secondary" onClick={handleClose}>Close</Button>
                    <Button type="submit" onClick={handleClose}>Save Changes</Button>
                </form>

                

            </div>

            
           
                    
            
           
        
        </Modal.Body>
        {/* <Modal.Footer>
        
          
        </Modal.Footer> */}
      </Modal>

                    
                    

<div className="cols">

        
                        <div id ="mythemes" ref={themes} className="themes">
                            
                            
                        
                            <input type="button" name="theme" className="one" value="blackyellow" onClick={mygetVal}></input>
                            <input type="button" name="theme" className="two" value="redwhite" defaultChecked onClick={mygetVal}></input>
                            <input type="button" name="theme" className="three" value="bluewhite" onClick={mygetVal}></input>
                            <input type="button" name="theme" className="four" value="orangewhite" onClick={mygetVal}></input>
                            <input type="button" name="theme" className="five" value="custom" onClick={mygetVal}></input>
                        </div>
                        
                    
                    </div>


                    

                    
                
                   
                    <div className="AllContent">
                        <FetchData/>
                    </div>
                </div>

               
                
                    
        </div>
        
    )
}