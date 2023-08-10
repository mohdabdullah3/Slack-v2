import React from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import { useLogout } from '../customHooks/useLogout'

function Navbar() {

   const { logout, isloading } = useLogout();

   return (
      <>
         <div className="navbar">
            <img src={logo} alt="Logo" />
            {!isloading && <button className='btn' onClick={logout}>Logout</button>}
            {isloading && <button className='btn' disabled>Loading</button>}
         </div>
      </>
   )
}

export default Navbar