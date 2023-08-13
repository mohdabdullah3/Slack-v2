import React , { useState } from 'react'
import './Login.css';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { useLogin } from '../customHooks/useLogin';

function Login() {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const {login, isLoading, error} = useLogin();

   function handleSubmit(e) {
      e.preventDefault();
      login(email,password);
   }

  return (
   <>
      <form onSubmit={handleSubmit} className='form'>
         <img className='logo' src={logo} alt="logo" />
         <h3>Log In</h3>

         <input type="email" required onChange={e => setEmail(e.target.value)} value={email} placeholder='Enter Email' />
         <input type="password" required onChange={e => setPassword(e.target.value)} value={password} placeholder='Enter Password' autoComplete="current-password" />
         
         { !isLoading && <button className='btn'>Login</button>}
         { isLoading && <button className='btn' disabled>Loading</button>}
         {error && <div className="error">{error}</div> }

         <span className='register'>No account? <Link to="/signup">Click here to Register</Link></span>
      </form>
   </>
  )
}
export default Login