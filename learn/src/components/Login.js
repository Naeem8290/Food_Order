import React, { useContext, useState } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { contextapi } from '../Contextapi';

const Login = () => {


  const {  setLoginName } = useContext(contextapi)
  const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password  , setPassword] = useState('');
    const [message  , setMessage] = useState('');

    function handleLogin(e){
        e.preventDefault()
        const Logindata = {username , password}

        
        fetch("/api/Login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Logindata)
          }).then((res)=>{return res.json()}).then((data)=>{
            console.log(data)
            if(data.status === 200 ){
              localStorage.setItem("loginname" ,data.apiData )
              setLoginName(localStorage.getItem("loginname"))
                  if(data.apiData === "admin"){
                      navigate("/dashboard")
                  }else{
                      navigate("/foodProducts")
                  }

              toast.success(data.message)
                  setMessage(data.message)
          }else{
              setMessage(data.message)
              toast.error(data.message)
          }
          })
    }
  return (
    <div id="loginpage" style={{height:'64vh'}}>
    <div className='container-fluid' >
    <div className='row'>
        <div className='col-md-7'></div>
        <div className='col-md-5'>
           
            <form onSubmit={(e)=>{handleLogin(e)}}>
            <h3 id="regheading" >Login Please</h3>
                <MDBInput value={username} onChange={(e) => setUsername(e.target.value)} label='Username' id='controlledValue' type='text' className='mt-3'  required />
                <MDBInput value={password} onChange={(e) => setPassword(e.target.value)} label='Password' id='controlledValue' type='password' className='mt-3'  required />
               
                <button className='form-control mt-2 btn btn-success'>Login</button>
              <Link to="/reg">  <button className='form-control mt-2 btn btn-primary'>Register</button></Link>
    
    
            </form>
        </div>
    </div>

</div>
</div>
  )
}

export default Login