import React, { useState } from 'react'
import {BrowserRouter , Route , Routes} from "react-router-dom"
import Reg from './components/Reg'
import Login from './components/Login'
import { contextapi } from './Contextapi'
import Navbar from './components/Navbar'
import Admindashboard from './components/Admindashboard'
import Admininsertform from './components/Admininsertform'
import Admineditform from './components/Admineditform'
import FoodProducts from './components/FoodProducts'
import Footer from './components/Footer'
import Cartpage from './components/Cartpage'
import ProtectedRoute from './components/ProtectedRoutes'
import BuyNow from './components/BuyNow'

const App = () => {

  const getCart = ()=>{
    const cart = localStorage.getItem("cart");
    if(cart){
      return JSON.parse(cart);
    }
    return {}
  }


  const [loginname, setLoginName] = useState(localStorage.getItem("loginname"));
  const [cart, setCart] = useState(getCart());

  
  return (
    <div>
      <BrowserRouter>
      <contextapi.Provider value={{loginname, setLoginName , cart , setCart}} >
        <Navbar/>
      <Routes>
        <Route path='/' element={<FoodProducts/>}/>
        <Route path="/reg" element = {<Reg/>}/>
        <Route path = "/Login" element = {<Login/>}/>
        <Route path= "/dashboard" element = { <ProtectedRoute><Admindashboard/></ProtectedRoute>}/>
        <Route path= "/AdminInsertForm" element = {<ProtectedRoute><Admininsertform/></ProtectedRoute>}/>
        <Route path = "/adminproductupdate/:id" element = { <ProtectedRoute><Admineditform/></ProtectedRoute>}/>
        <Route path="/foodProducts" element = {<FoodProducts/>}/>
        <Route path = "/addtocartpage" element = {  <ProtectedRoute><Cartpage/></ProtectedRoute>}/>
        <Route path="/completed" element = {<BuyNow/>}/>
      </Routes>
      <Footer/>
 
      </contextapi.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App