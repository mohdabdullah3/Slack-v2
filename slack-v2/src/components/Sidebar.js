import React from 'react'
import './Sidebar.css'
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import { useAuthContext } from '../customHooks/useAuthContext';

function Sidebar() {
  const { user } = useAuthContext();
   return (
    <>
      <div className="sidebar">
        <div className="user">
          <Avatar photo={user.photoURL} />
          <h4>{user.displayName}</h4>
        </div>
        <div className="sideMenu">
          <ul>
            <li>
              <NavLink to="/" >
                <Icon icon="ic:outline-dashboard" />
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/new-project" >
                <Icon icon="ic:round-add" />
                <p>New Project</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar