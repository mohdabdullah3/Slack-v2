import React, { useState } from 'react'
import './Projects.css'
import { useGetData } from '../../customHooks/useGetData'
import ProjectCard from '../../components/ProjectCard'
import { FilterTabs } from './FilterTabs'
import { useAuthContext } from '../../customHooks/useAuthContext'
import SyncLoader from "react-spinners/SyncLoader";

function Projects() {
  const { documents, isLoading, error } = useGetData('projects')
  const [filter, setFilter] = useState('All')
  const { user } = useAuthContext()

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  }

  const f_Projects = documents ? documents.filter(document => {
    switch (filter) {
      case 'All':
        return true
      case 'Mine':
        let assignedToMe = false
        document.assignedUsersList.forEach(u => {
          if (user.uid === u.id) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'Development':
      case 'Designing':
      case 'Requirement':
      case 'Validation':
      case 'Testing':
      case 'Deployment':
        return document.category.includes(filter.toLowerCase())
      default:
        return true
    }
  }) : null

  return (
    <>
      <div className="dashboard">
        <h2>Dashboard</h2>
        {error && <div className="error">{error}</div>}
        { isLoading &&
          <SyncLoader
            className='loader'
            color='rgb(94, 94, 250)'
            loading={true}
            size={10}
          />
        }
        {documents && (
          <FilterTabs currentFilter={filter} changeFilter={changeFilter} />
        )}
        {f_Projects && <ProjectCard projects={f_Projects} />}
      </div>
    </>
  )
}

export default Projects