import React from 'react'

const FilterElements = ['All','Mine' ,'Requirement', 'Designing', 'Development', 'Validation', 'Testing', 'Deployment']

export const FilterTabs = ({ currentFilter, changeFilter }) => {

  return (
    <div className='projectsFilter'>
      <nav>
         {FilterElements.map(f => (
            <button
               key={f}
               className={f === currentFilter ? 'active': ""}
               onClick={() => changeFilter(f)}
            >
               {f}
            </button>
         ))}
      </nav>
    </div>
  )
}
