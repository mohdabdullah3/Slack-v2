import React from 'react'
import './ProjectCard.css'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';

export default function ProjectCard({ projects }) {
  return (
    <>
      <div className="projectsCards">
        {projects.length === 0 && <p>No Projects yet!</p>}
        
        {projects.map(project => (
          <Link to={`projects/${project.id}`} key={project.id}>
            <Avatar photo={project.createdBy.photoURL} />
            <h3>{project.name}</h3>
            <span className='details'>{project.details}</span>
            <span className='category'>{project.category}</span>

            <div className="assignedTo">
            <p><Icon icon="game-icons:sands-of-time" /> {project.dueDate.toDate().toDateString()}</p>
              <ul>
                {project.assignedUsersList.map(user => (
                  <li key={user.photoURL}>
                    <Avatar photo={user.photoURL} />
                  </li>
                ))}
              </ul>
            </div>

          </Link>
        ))}
      </div>
    </>
  )
}
