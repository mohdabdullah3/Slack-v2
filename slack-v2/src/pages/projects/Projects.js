import React from 'react'
import './Projects.css'
import { useGetData } from '../../customHooks/useGetData'
import ProjectCard from '../../components/ProjectCard'

function Projects() {
  const { documents, error } = useGetData('projects')
  return (
    <>
      <div className="dashboard">
        <h2>Dashboard</h2>
        {error && <div className="error">{error}</div> }
        {documents && <ProjectCard projects={documents} /> }
      </div>
    </>
  )
}

export default Projects