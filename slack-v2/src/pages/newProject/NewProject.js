import { useAuthContext } from '../../customHooks/useAuthContext'
import { useGetData } from '../../customHooks/useGetData'
import React, { useEffect, useState } from 'react'
import { timeStamp } from '../../firebase/config'
import Select from 'react-select'
import './NewProject.css'
import { useFirestore } from '../../customHooks/useFirestore'
import { useNavigate } from 'react-router-dom'

const categories = [
  {value:'requirement gathering' , label:'Requirement Gathering'},
  {value:'designing' , label:'Designing'},
  {value:'development' , label:'Development'},
  {value:'verification & validation' , label:'Verification & Validation'},
  {value:'testing' , label:'Testing'},
  {value:'deployment' , label:'Deployment'},
]

function NewProject() {
  const navigate = useNavigate()
  const { documents } = useGetData('users');
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore('projects')

  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);

  const [errors, setErrors] = useState(null)

  useEffect(() => {
    if (documents) {
      const options = documents.map(user => {
        return { value: user , label: user.displayName }
      })
      setUsers(options)
    }
  }, [documents])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    if (!category) {
      setErrors("Please select the project category")
      return
    }
    if (assignedUsers.length < 1) {
      setErrors("Please select atleast one user")
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map(user => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id
      }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timeStamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }

    await addDocument(project);
    if (!response.error) {
      navigate('/')
    }
  }

  return (
    <>
      <div className="create">
        <h2 className='createTitle'>Create a new project</h2>

        <form onSubmit={handleSubmit}>
          <label>
            <span>Project Name:</span>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </label>

          <label>
            <span>Project Description:</span>
            <textarea type="text" value={details} onChange={e => setDetails(e.target.value)} required />
          </label>

          <label>
            <span>Set due date:</span>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
          </label>

          <label >
            <span>Project Category:</span>
            <Select
            className='select'
            options={categories}
            onChange={option => { 
              setCategory(option)
              setErrors(null)
            }} />
          </label>

          <label>
            <span>Assign to:</span>
            <Select
            onChange={option => {
              setAssignedUsers(option)
              setErrors(null)
              }}
            options={users}
            isMulti />
          </label>

          {response.isPending && <button className='btn'>Loading</button>}
          {!response.isPending && <button className='btn'>Add Project</button>}
          {errors && <div className="error">{errors}</div> }
        </form>

      </div>
    </>
  )
}

export default NewProject