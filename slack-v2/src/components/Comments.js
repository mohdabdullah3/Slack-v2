import React, { useState } from 'react'
import './Comments.css'
import { timeStamp } from '../firebase/config'
import { useAuthContext } from '../customHooks/useAuthContext'
import { useFirestore } from '../customHooks/useFirestore'
import Avatar from './Avatar'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export const Comments = ({ project }) => {
   const { updateDocument, response } = useFirestore('projects')
   const [newComment, setNewComment] = useState('');
   const { user } = useAuthContext()

   const handleSubmit = async (e) => {
      e.preventDefault();
      const comment = {
         displayName: user.displayName,
         photoURL: user.photoURL,
         content: newComment,
         createdAt: timeStamp.fromDate(new Date()),
         id: Math.random()
      }
      
      if (!response.error) {
         setNewComment('')
      }
      await updateDocument(project.id, { 
         comments: [...project.comments, comment]
       })
   }
  return (
    <>
      <div className="comments">
         <h4>Project Comments</h4>

         <form onSubmit={handleSubmit}>
            <label>
               <span>Add new comment:</span>
               <textarea
                  onChange={e => setNewComment(e.target.value)}
                  value={newComment}
                  required
               ></textarea>
            </label>
            <button className='btn'>Add Comment</button>
         </form>

         <ul>
            {project.comments.length > 0 && project.comments.slice(0).reverse().map(comment => (
               <li key={comment.id}>
                  <div className="commentWriter">
                     <Avatar photo={comment.photoURL} />
                     <p>{comment.displayName}</p>
                  </div>
                     
                     <div className="commentDate">
                        <p>{formatDistanceToNow(comment.createdAt.toDate() , { addSuffix: true })}</p>
                     </div>
                     
                     <div className="commentContent">
                        <p>{comment.content}</p>
                     </div>
                  
               </li>
            ))}
         </ul>

      </div>
    </>
  )
}
