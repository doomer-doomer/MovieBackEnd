import logo from './logo.svg';
import './App.css';
import FetchData, { myarr } from './Data';
import './card.css'
import PageHeader from './header';
import './header.css'
import FinalLayout from './FinalLayout';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import SingleLay from './SingleLayout';
import Layout from './DataLayout';
import Datas from './datas';
import season from './season';
import episodes from './episodes';
import './singleLayout.css'
import Login from './login';
import './login.css'
import { useState } from 'react';
import Signup from './signup';

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
  return (
   
        <div className="Root">
          <div className="Contents">
            <Routes>
              <Route path='/Homepage' element={<FinalLayout/>}></Route> 
              <Route path='/Login' element={<Login/>}></Route> 
              <Route path='/Signup' element={<Signup/>}></Route>  
            </Routes>

            
            
          </div>
        </div>
    
    
  );
}

export default App;
