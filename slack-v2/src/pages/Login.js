import React , { useState } from 'react'
import './Login.css';
import logo from '../assets/logo.png'

function Login() {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   function handleSubmit(e) {
      e.preventDefault();
      console.log(email,password);
   }

  return (
   <>
      <form onSubmit={handleSubmit} className='form'>
         <img className='logo' src={logo} alt="logo" />
         <h3>Log In</h3>
         <input type="email" required onChange={e => setEmail(e.target.value)} value={email} placeholder='Enter Email' />
         <input type="password" required onChange={e => setPassword(e.target.value)} value={password} placeholder='Enter Password' />
         <button className='btn'>Login</button>
         <span className='register'>No account? <a href="">Click here to Register</a></span>
      </form>
   </>
  )
}
export default Login