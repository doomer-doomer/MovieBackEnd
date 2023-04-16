import FetchData from "./Data"
import React, { useState,useEffect } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from "react-router-dom"
import Lottie from "lottie-react";
import notfoundanim from "./notfound.json";


export default function PageHeader(){
    
    const navigate = useNavigate();
const [modalShow, setModalShow] = useState(false);

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const [subscriptionAlert, setsubscriptionAlert] = useState(false);
const handleClosesubscriptionAlert = () => setsubscriptionAlert(false);
const handleShowsubscriptionAlert = () => setsubscriptionAlert(true);

const [subscriptionStatus, setsubscriptionStatus] = useState(false);
const handleClosesubscriptionStatus = () => setsubscriptionStatus(false);
const handleShowsubscriptionStatus = () => setsubscriptionStatus(true);

const [setsubscription,checksetsubscription]=useState(false);
const [subscriptionpack,setsubscriptionpack]=useState("")
const [subscriptionprice,setsubscriptionprice]=useState("")
const [subscriptionstart,setsubscriptionstart]=useState("")
const [subscriptionend,setsubscriptionend]=useState("")

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
            setcountry(response[0].country);
    
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

    function subscribe(){
        navigate('/subscription');
    }

    const allowances = async event=>{
        try {
            const token = localStorage.getItem('jwt_token');
            if (!token) return;
            const getSubscriberData = await fetch("http://localhost:5000/subscriberAllData",{
                method:"POST",
                headers: { Authorization: `Bearer ${token}`,
                jwt_token: token
            },
            });

            const userData = await getSubscriberData.json();

            setsubscriptionpack(userData.subscription_name)
            setsubscriptionprice(userData.subscription_price)
            setsubscriptionstart(userData.subscription_start_date)
            setsubscriptionend(userData.subscription_end_date)

            if(!getSubscriberData.ok){
                console.log("No Data found")
                return;
            }

            

        } catch (error) {
            console.log(error.message);
        }
    }

    const checkSubscription= async e =>{
        try {
            const token = localStorage.getItem('jwt_token');
            const subscriberData = await fetch("http://localhost:5000/subscriberData",{
                method:"POST",
                headers: { Authorization: `Bearer ${token}`,
                jwt_token: token
            },
            });

            if (!subscriberData) return;

            const newtoken = await subscriberData.json();
            //console.log(newtoken.subscription_id)
            
            if(newtoken!=="Not Subscribed"){
                try {
                    const res = await fetch("http://localhost:5000/subscriptionCheck",{
                    method:"POST",
                    headers: { Authorization: `Bearer ${newtoken.subscription_id}`,
                    subscription_token: newtoken.subscription_id
                    },
                    });

                    const response = await res.json();
                    if(!res.ok){
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
                            setTimeout(handleShowsubscriptionAlert,10000);
                            
                        
                    }
    
                    if(response===true){
                        toast.success("Subscription Validated✔️", {
                            position: "bottom-left",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            });
                            checksetsubscription(true)
                    }else{
                        toast.info("Subscription Required", {
                            position: "bottom-left",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            });
                    }
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
        allowances();
        myusername();
        setgreet(greeting);
        getData();
        checkSubscription();
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
                            <Dropdown>

                                <DropdownButton
                                    
                                    key="down"
                                    id="dropdown-button-drop-down"
                                    drop="down"
                                    title="View Profile"
                                    variant="danger"
                                    align={{ lg: 'start' }}
                                >
                                    <Dropdown.ItemText href="#">{greet},<br></br> {currentusername}</Dropdown.ItemText>
                                    <Dropdown.Header>{email}</Dropdown.Header>
                                
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleShow}>Edit Profile</Dropdown.Item>
                                    <Dropdown.Item onClick={handleShowsubscriptionStatus}>My Subscription</Dropdown.Item>
                                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                </DropdownButton>
                                </Dropdown>
                                {/* <div className="user_detailz">
                                <h3>{greet}, {currentusername}</h3>
                                <h5>{email}</h5>
                                </div>
                                
                                <button onClick={handleShow}>Edit Profile</button>
                                <button onClick={logout}>Logout</button>             */}
                            </div>
                            
                        </div>
                    </div>
                    <Modal
                        show={subscriptionAlert}
                        onHide={handleClosesubscriptionAlert}
                        backdrop="static"
                        keyboard={false}
                        centered
                        size="lg"
                    >
                       <Modal.Header>
                            <Modal.Title>Hey there!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h1>Looks like your are not Subscribed!</h1>
                            <h4>💥Click below to Check out our awesome plans💥</h4>
                        </Modal.Body>
                        <Modal.Footer>
                        
                        <Button variant="primary" onClick={subscribe}>Subcriptions</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        show={subscriptionStatus}
                        onHide={handleClosesubscriptionStatus}
                        backdrop="static"
                        keyboard={false}
                        centered
                        size="lg"
                    >
                       <Modal.Header closeButton>
                            <Modal.Title><h1>Your Subscription</h1></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {!setsubscription && <div className="nosubscriptionfound">
                                
                                <Lottie animationData={notfoundanim} loop={true} />
                                No Subscription Found!</div>}

                                {setsubscription && <div className="subscriptionfound">
                                    <h1>{subscriptionpack}</h1>
                                    <h3>₹{subscriptionprice}</h3>
                                    <p>{subscriptionstart} to {subscriptionend}</p>
                                    </div>}
                        </Modal.Body>
                        {!setsubscription && <Modal.Footer>
                        
                        <Button variant="primary" onClick={subscribe}>Subcriptions</Button>
                        </Modal.Footer>}
                    </Modal>
                    

                    
                    <Modal show={show} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className="editform">

<div className="nonchangaleinfo">
<label className="lab">Email <input className="inp5"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /></label>

                    <label className="lab">Gender <input className="inp5"
                        type="text"
                        value={gender}
                        onChange={(e) => setgender(e.target.value)}
                    /></label>
                    <label className="lab">Country <input className="inp5"
                        type="text"
                        value={country}
                        onChange={(e) => setcountry(e.target.value)}
                    /></label>
</div>
<hr></hr>
                    
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