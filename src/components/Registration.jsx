import React, { useState } from 'react'
import '../styles/registration.css';

export default function Registartion() {
  const[isLogin, setIsLogin]= useState(true);
  return (
    
    <div className='container'>
      <div className='form-container'>
        <div className='form-toggle'>
          <button className={isLogin ? 'active':""} onClick={()=>setIsLogin(true)}>Login</button>
          <button className={!isLogin ? 'active':""}onClick={()=>setIsLogin(false)}>SignUp</button>
        </div>
        {isLogin ? <>
        <div className='form'>
          <h2>Login Form</h2>
          <input type='email' placeholder='Email'></input>
          <input type='password' placeholder='password'></input>
          <a href='#'>Forgot Password?</a>
          <button>Login</button>
          <p>Not a Member? <a href='#' onClick={()=>setIsLogin(false)}>SignUp Now</a></p>
        </div>
        </>:<>
        <div className='form'>
        <h2>SignUP Form</h2>
          <input type='email' placeholder='Email'></input>
          <input type='password' placeholder='password'></input>
          <input type='password' placeholder='confirm password'></input>
          <button>SUBMIT</button>

        </div>
        </>}
      </div>
    </div>
  )
  }