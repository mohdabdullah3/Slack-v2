import React from 'react'
import './Avatar.css'

export default function Avatar({ photo }) {
   return (
      <>
         <div className="avatar">
            <img src={photo} alt="" />
         </div>
      </>
   )
}
