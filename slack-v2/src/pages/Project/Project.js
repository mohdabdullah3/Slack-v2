import React from 'react'
import './Project.css'
import Avatar from '../../components/Avatar'
import { Icon } from '@iconify/react';
import { useParams } from "react-router-dom"
import { useDocument } from '../../customHooks/useDocument';
import { Comments } from '../../components/Comments';
import { useFirestore } from '../../customHooks/useFirestore';
import { useAuthContext } from '../../customHooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import SyncLoader from "react-spinners/SyncLoader";

export default function Project() {
  const { deleteDocument } = useFirestore('projects')
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const { id } = useParams();
  const { error, document } = useDocument('projects', id)

  const handleDelete = (e) => {
    deleteDocument(document.id)
    navigate('/')
  }

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">
      <SyncLoader
        className='loader'
        color='rgb(94, 94, 250)'
        loading={true}
        size={10}
      />
    </div>
  }

  return (
    <div className='project'>
      <div className='projectDetails'>
        <h3>{document.name}</h3>
        <p>By {document.createdBy.displayName}</p>
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
        {user.uid === document.createdBy.id && (
          <button className='btn' onClick={handleDelete}>Mark as Complete</button>
        )}
      </div>
      <div className="CommentSection">
        <Comments project={document} />
      </div>
    </div>
  )
}
