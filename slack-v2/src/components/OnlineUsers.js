import React from 'react'
import './OnlineUsers.css'
import { useGetData } from '../customHooks/useGetData'
import Avatar from './Avatar';

function OnlineUsers() {
  const { documents, error } = useGetData('users');
  return (
    <div className="rightbar">
      <h4>Team Members</h4>
      {error && <div className="error">{error}</div>}
      {documents && documents.map(user => {
        return (
          <div key={user.id} className="userStatus">
            {user.online && <div className="onlineSymbol"></div> }
            {!user.online && <div className="offlineSymbol"></div> }
            <span>{user.displayName}</span>
            <Avatar photo={user.photoURL} />
          </div>
        )
      })}
    </div>
  )
}

export default OnlineUsers