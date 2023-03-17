import logo from './logo.svg';
import './App.css';
import FetchData, { myarr } from './Data';
import './card.css'
import PageHeader from './header';
import './header.css'
import FinalLayout from './FinalLayout';
import { BrowserRouter as Router,Route,Routes,Redirect, Navigate } from 'react-router-dom';
import SingleLay from './SingleLayout';
import Layout from './DataLayout';
import Datas from './datas';
import season from './season';
import episodes from './episodes';
import './singleLayout.css'
import Login from './login';
import './login.css'
import { useEffect, useState } from 'react';
import Signup from './signup';
import AdminPage from './Admin';

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

  const checkAuthentication = async()=>{
    try {
      const res = await fetch("http://localhost:5000/check",{
        method:"POST",
        headers:{jwtToken:localStorage.jwtToken}
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false); 
    } catch (error) {
      console.log(error.message);
    };

    
  }

  useEffect(()=>{
    checkAuthentication();
    
  },[]);

  const [isAuthorized,setIsAuthenticated] = useState(false);

  
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
  return (
   
        <div className="Root">
          <div className="Contents">
            <Routes>
              <Route path='/Homepage' render={
                isAuthorized ? (
                  <Navigate to="/Login"></Navigate>
                ) : (
                  <Navigate to="/Homepage"></Navigate>
                )
              }element={<FinalLayout/>}></Route> 
              <Route path='/Login' render={props =>
                !isAuthorized ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Navigate to="/Homepage"></Navigate>
                )
              }element={<Login/>}></Route> 
              <Route path='/Signup' render={props =>
                !isAuthorized ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Navigate to="/Homepage"></Navigate>
                )
              }element={<Signup/>}></Route>
              <Route path='/Admin' element={<AdminPage/>}></Route>    
            </Routes>

            
            
          </div>
        </div>
    
    
  );
}

export default App;
