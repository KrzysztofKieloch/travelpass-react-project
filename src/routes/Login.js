import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";  
import { useSignIn } from "react-auth-kit";
import { useNavigate } from 'react-router-dom'

function Login() {

    const [userResult, setUserResult] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const navigate = useNavigate();
    const signIn = useSignIn();

    const login = () => {
        axios.post("http://localhost:1337/api/auth/local", {
          identifier: userEmail,
          password: userPassword
        })
        .then(result => {
          setUserResult(JSON.stringify(result, null, 2));
          localStorage.setItem('token', result.data.jwt)
          console.log(result)

          if (result.status === 200) {
            signIn({
              token: result.data.jwt,
              expiresIn: 3600,
              tokenType: "Bearer",
              authState: {email: userEmail},
            })
            navigate('/admin_panel')
          } else {
            console.log("error")
          }
        })
      }
      const onFormSubmit = e => {
        e.preventDefault();
      }
    return (
        <>
        <Navbar/>
        <div className="container bg-light" style={{padding: "120px"}}>
        <form onSubmit={onFormSubmit}>
        <h1 style={{color:"black", padding:"20px"}}>LOGIN</h1>
        <div className="form-outline mb-4">
          <input type="email" 
          id="form2Example1" 
          className="form-control text-center" 
          placeholder="Email address"
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          />
        </div>
        
        <div className="form-outline mb-4">
        <input type="password" 
        id="form2Example2" 
        className="form-control text-center" 
        placeholder="Password"
        onChange={(e) => setUserPassword(e.target.value)}
        value={userPassword} 
        />
        </div>
      
       
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
        </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4" onClick={login}>Sign in</button>
      </form>
      </div>
      <p>{userResult}</p>
      </>
    )
}

export default Login;