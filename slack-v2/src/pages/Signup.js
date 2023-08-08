import React , { useState } from 'react'
import useSignup from '../customHooks/useSignup';
import './Login.css';
import logo from '../assets/logo.png'

function Signup() {

   const [email, setEmail] = useState('');
   const [password, setpPassword] = useState('');
   const [displayName, setDisplayName] = useState('');
   const [photo, setphoto] = useState(null);
   const { isLoading , error , signup } = useSignup();

   function handleSubmit(e) {
      e.preventDefault();
      signup(email , password , displayName)
   }

   function handlePhoto(e) {
      setphoto(e.target.files[0]);
   }

  return (
   <>
      <form className='form' onSubmit={handleSubmit}>
         <img className='logo' src={logo} alt="logo" />
         <h3>Sign up</h3>
         <input type="text" required onChange={e => setDisplayName(e.target.value)} value={displayName} placeholder='Enter full name' />
         <input type="email" required onChange={e => setEmail(e.target.value)} value={email} placeholder='Enter email' />
         <input type="password" required onChange={e => setpPassword(e.target.value)} value={password} placeholder='Enter password' />
         <button className='btn'>Sign up</button>
         <span className='register'>Already logged In? <a href="">Go to login page</a></span>
      </form>

   </>
  )
}
export default Signup