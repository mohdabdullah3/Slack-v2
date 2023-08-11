import React from 'react'
import './Sidebar.css'
import photo from '../assets/abdullah.JPG'
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="user">
          <div className="avatar">
            <img src={photo} alt="" />
          </div>
          <h4>Muhammad Abdullah</h4>
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