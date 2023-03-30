import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./post.css"
const ToDoForm = () => {
    let token=window.localStorage.getItem("token")
    let url="https://todoapp-backend-yoii.onrender.com/aftersuccessfullogin/posttododata"
  const [toDoItem, setToDoItem] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priorityLevel, setPriorityLevel] = useState(1);
  const [starred, setStarred] = useState(false);
  const [userReference, setUserReference] = useState('');
   let navigate=useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(url, {
      toDoItem: toDoItem,
      dueDate: dueDate,
      priorityLevel: priorityLevel,
      starred: starred,
      finishedDate: userReference
    },{
        headers:{
            Authorization:token
        }
    })
      .then(response => {
        console.log(response);
        if(response.data.status==="success"){
           navigate("/home")
        }
        else{
            alert("error")
        }
        // do something with successful response, e.g. clear form
      })
      .catch(error => {
        console.log(error);
        // do something with error response, e.g. show error message
      });
  };

  return (
    <div id="main">
         <form onSubmit={handleSubmit} id="postitems">
            <h1>PostData</h1>
      <label>
        To do item:<br></br>
        <input type="text" value={toDoItem} onChange={(event) => setToDoItem(event.target.value)} />
      </label>
      <br />
      <label>
        Due date:<br></br>
        <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
      </label>
      <br />
      <label>
        Priority level:<br></br>
        <input type="number" value={priorityLevel} onChange={(event) => setPriorityLevel(event.target.value)} />
      </label>
      <br />
      <label>
        finisheddate:<br></br>
        <input type="date" value={userReference} onChange={(event) => setUserReference(event.target.value)} />
      </label>
       <label style={{marginTop:"2px"}}>
        Starred:
        <input type="checkbox" checked={starred} onChange={(event) => setStarred(event.target.checked)} style={{marginLeft:"-120px",marginTop:"15px"}}/>
      </label>
      <br />
      <br />
      <button type="submit" style={{width:"100px",height:"30px",borderRadius:"20px",backgroundColor:"blue",color:"white"}}>Add item</button>
    </form>
    </div>
   
  );
};

export default ToDoForm;
