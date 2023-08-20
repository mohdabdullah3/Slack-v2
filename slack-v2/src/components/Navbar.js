import React from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import { useLogout } from '../customHooks/useLogout'

function Navbar() {

   const { logout, isLoading } = useLogout();

   return (
      <>
         <div className="navbar">
            <img src={logo} alt="Logo" />
            {isLoading && <button className='btn' disabled>Loading</button>}
            {!isLoading && <button className='btn' onClick={logout}>Logout</button>}
         </div>
      </>
   )
}

export default Navbar