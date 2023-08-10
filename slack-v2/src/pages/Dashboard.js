import React from 'react'
import './Dashboard.css'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <>
    <div className="container">
      <Sidebar />
      <div className="bo">
      <Navbar />

      </div>
    </div>
    </>
  )
}

export default Dashboard;