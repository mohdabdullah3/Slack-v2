import React , { useState } from 'react'
import useSignup from '../customHooks/useSignup';

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
      <form onSubmit={handleSubmit}>
         <input type="text" required onChange={e => setDisplayName(e.target.value)} value={displayName} placeholder='Enter your full name' />
         <input type="email" required onChange={e => setEmail(e.target.value)} value={email} placeholder='Enter Email' />
         <input type="password" required onChange={e => setpPassword(e.target.value)} value={password} placeholder='Enter Password' />
         {/* <input type="file" required onChange={handlePhoto}  /> */}
         { isLoading && <button disabled>Loading</button> }
         { !isLoading && <button>Signup</button> }
         { error && <div>{error}</div> }
      </form>
   </>
  )
}
export default Signup