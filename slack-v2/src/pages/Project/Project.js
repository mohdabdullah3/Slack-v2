import React from 'react'
import './Project.css'
import Avatar from '../../components/Avatar'
import { Icon } from '@iconify/react';
import { useParams } from "react-router-dom"
import { useDocument } from '../../customHooks/useDocument';

export default function Project() {
  const { id } = useParams();
  const { error, document } = useDocument('projects', id)

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading....</div>
  }

  return (
    <div className='projectDetails'>
      <h3>{document.name}</h3>
      <span className='details'>{document.details}</span>
      <span className='category'>{document.category}</span>

      <div className="assignedTo">
        <p><Icon icon="game-icons:sands-of-time" /> {document.dueDate.toDate().toDateString()}</p>
        <ul>
          {document.assignedUsersList.map(user => (
            <li key={user.photoURL}>
              <Avatar photo={user.photoURL} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
