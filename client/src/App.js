import './App.css';
import './card.css'
import './header.css'
import FinalLayout from './FinalLayout';
import { BrowserRouter as Router,Route,Routes,Redirect, Navigate } from 'react-router-dom';
import SingleLay from './SingleLayout';
import './singleLayout.css'
import Login from './login';
import './login.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from './signup';
import AdminPage from './Admin';
import ErrorPage from './404Page';
import Middle from './MiddlePage';
import StartPage from './StartPage';
import './errorPage.css'
import './middle.css'
import './startpage.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './admin.css'
import './signuplay.css'
import './DataLayout.css'
import Subcribe from './subscription';
import './subscription.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

let newTitle = new Array()
export function Mytoggle (title,logo,img,ep,rating,isvisible){

  console.log(title)
  console.log(logo)
  console.log(img)
  console.log(ep)
  console.log(rating)
  let thistitle = title
  //newTitle = thistitle
  newTitle.push(title)
  console.log(newTitle)
  console.log(isvisible)
  return <SingleLay 
  myimage = {img}
  title="Tejas"/>
  
}




function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const [isAuthorized,setIsAuthenticated] = useState(false);

  const checkAuthentication = async()=>{
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) return;
      const res = await fetch("http://localhost:5000/checkauth",{
        method:"POST",
        headers: { Authorization: `Bearer ${token}`,
          jwt_token: token
      },
      });

      const parseRes = await res.json();

      if (!res.ok){
        toast.warn(parseRes, {
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
        

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false); 

      if(parseRes ===true){
        toast.info("Authentication Successful", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }else{
        toast.info("Session Expired", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          setTimeout(handleShow,4000)

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
      //localStorage.removeItem('jwt_token');
    };

    
  }

  useEffect(()=>{
    checkAuthentication();
    
  },[]);

  
  const navigate = useNavigate();
  
  const sessionExpired=()=>{
    handleClose()
  }
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
  return (
   
        <div className="Root">
          <div className="Contents">
          
            <ToastContainer/>
            <Routes>
              <Route path='/Homepage' element={isAuthorized? <FinalLayout/>:<Login/>}></Route> 
              <Route path='/Login' element={!isAuthorized ? <Login/> : <Middle/>}></Route> 
              <Route path='/Signup' element={!isAuthorized ? <Signup/> : <Middle/>}></Route>
              <Route path='/Admin' element={<AdminPage/>}></Route>    
              <Route path='/' element={!isAuthorized ? <StartPage/> : <Middle/>}/>
              <Route path='/middle' element={<Middle/>}></Route>
              <Route path='/subscription' element={isAuthorized?<Subcribe/>:<Login/>}></Route>
            </Routes>

            
            
          </div>
        </div>
    
    
  );
}

export default App;
