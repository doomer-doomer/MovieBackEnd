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
import { useNavigate } from 'react-router-dom';
import Signup from './signup';
import AdminPage from './Admin';
import ErrorPage from './404Page';
import Middle from './MiddlePage';

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

      if (!res.ok) throw new Error('Unauthorized');

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false); 
    } catch (error) {
      console.log(error.message);
      // localStorage.removeItem('jwt_token');
    };

    
  }

  useEffect(()=>{
    checkAuthentication();
    
  },[]);

  
  const navigate = useNavigate();
  
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
  return (
   
        <div className="Root">
          <div className="Contents">
            <Routes>
              <Route path='/Homepage' element={isAuthorized ? <FinalLayout/> : <ErrorPage status= "Login Required" err="Token has expired!"/>}></Route> 
              <Route path='/Login' element={!isAuthorized ? <Login/> : <Middle/>}></Route> 
              <Route path='/Signup' element={!isAuthorized ? <Signup/> : <Middle/>}></Route>
              <Route path='/Admin' element={<AdminPage/>}></Route>    
            </Routes>

            
            
          </div>
        </div>
    
    
  );
}

export default App;
