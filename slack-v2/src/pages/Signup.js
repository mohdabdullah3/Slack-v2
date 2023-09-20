import React , { useState } from 'react'
import useSignup from '../customHooks/useSignup';
import './Login.css';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

function Signup() {

   const [email, setEmail] = useState('');
   const [password, setpPassword] = useState('');
   const [displayName, setDisplayName] = useState('');
   const [profilePhoto, setProfilePhoto] = useState(null);
   const [fileError, setfileError] = useState(null);
   const { isLoading , error , signup } = useSignup();

   function handleSubmit(e) {
      e.preventDefault();
      if (!fileError) {
         signup(email , password , displayName, profilePhoto);
      }
   }
   console.log(error,fileError)
   function handlePhoto(e) {
      setProfilePhoto(null);
      setfileError(null);

      let fileReceived = e.target.files[0];

      if (!fileReceived) {
         setfileError('Please select an Image');
         return;
      }
      if (!fileReceived.type.includes('image')) {
         setfileError('Select only the Image');
         return;
      }
      if (fileReceived.size > 102500) {
         setfileError('Image size should be less than 100kb');
         return;
      }

      setfileError(null);
      setProfilePhoto(fileReceived);
   }

  return (
   <>
      <form className='form' onSubmit={handleSubmit}>
         
         <img className='logo' src={logo} alt="logo" />
         <h3>Sign up</h3>

         <input type="text" required onChange={e => setDisplayName(e.target.value)} value={displayName} placeholder='Enter full name' />
         <input type="email" required onChange={e => setEmail(e.target.value)} value={email} placeholder='Enter email' />
         <input type="password" required onChange={e => setpPassword(e.target.value)} value={password} placeholder='Enter password' autoComplete="current-password" />
         <input type="file" required onChange={handlePhoto} />

         { !isLoading && <button className='btn'>Sign up</button>}
         { isLoading && <button className='btn' disabled>Loading</button>}
         {fileError && <div className="error">{fileError}</div> }
         { error && <div className="error">{error}</div> }

         <span className='register'>Already logged In? <Link to="/login">Go to login page</Link></span>
      </form>

   </>
  )
}
export default Signup