import React, { useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

let token = window.localStorage.getItem('token')

let UpdatePage = () => {
  let { id } = useParams()
  let [toDoItem, setToDoItem] = useState('')
  let [dueDate, setDueDate] = useState('')
  let [priorityLevel, setPriorityLevel] = useState(1)
  let [starred, setStarred] = useState(false)

  let navigate = useNavigate()

  let handleUpdate = () => {
    let url = `https://todoapp-backend-yoii.onrender.com/aftersuccessfullogin/updatedata/${id}`
    let data = {
      toDoItem: toDoItem,
      dueDate: dueDate,
      priorityLevel: priorityLevel,
      starred: starred,
    }
    axios
      .put(url, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res)
        navigate('/home')
      })
  }

  return (
    <div id="update-page">
      <h1>Update ToDo Item</h1>
      <div>
        <label htmlFor="toDoItem">ToDo Item:</label>
        <input
          type="text"
          id="toDoItem"
          value={toDoItem}
          onChange={(e) => setToDoItem(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="priorityLevel">Priority Level:</label>
       <label>
        Priority level:<br></br>
        <input type="number" value={priorityLevel} onChange={(event) => setPriorityLevel(event.target.value)} />
      </label>
      </div>
      <div>
        <label htmlFor="starred">Starred:</label>
        <input
          type="checkbox"
          id="starred"
          checked={starred}
          onChange={(e) => setStarred(e.target.checked)}
        />
      </div>
      <button onClick={() => handleUpdate()}>Update</button>
    </div>
  )
}

export default UpdatePage
