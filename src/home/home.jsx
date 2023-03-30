import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./home.css"
let token=window.localStorage.getItem("token")
let Home = () => {
  let [data,setdata]=useState([])

  let navigate=useNavigate()
  useEffect(()=>{
    let url="https://todoapp-backend-yoii.onrender.com/aftersuccessfullogin/getalltododata"
    axios.get(url,{
      headers:{
        Authorization:token
      }
    })
    .then((res)=>{
      console.log(res);
      setdata(res.data.data)})
  },[])

  //logout
  let handlelogout=()=>{
    window.localStorage.clear("token")
     navigate("/login")
  } 

  //posttodo
  let handlepost=()=>{
    navigate("/posttodoitem")
  }
  let handlehome=()=>{
    navigate("/home")
  }

  //update todo
  let handleupdate=(id)=>{
    navigate(`/updateitem/${id}`)
  }

  //delete todo
  let handledelete=(id)=>{
    let url=`https://todoapp-backend-yoii.onrender.com/aftersuccessfullogin/deletedata/${id}`
    axios.delete(url,{
      headers:{
        Authorization:token
      }
    })
    .then(()=>{
      let updatedData = data.filter((item) => item._id !== id);
      setdata(updatedData);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div id="home">
      <div id="nav-parent">
        <ul className="items">
          <li onClick={()=>handlehome()}>Home</li>
          <li onClick={()=>handlepost()}>ADDTODO</li>
          <li onClick={()=>handlelogout()}>logout</li>
        </ul>
      </div>
      <div id="fetchingdata">
        {data.map((ele,i)=>{
          return <div key={ele._id} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:"2px solid"}}>
            <h1>PersonalData</h1>
            <h5>ToDOItem:{ele.toDoItem}</h5>
            <h5>DueDate:{ele.dueDate}</h5>
            <h5>priorityLevel:{ele.priorityLevel}</h5>
            <h5>starred:{ele.starred}</h5>
            <h5>CreationDate:{ele.creationDate}</h5>
            <h5>finishedDate:{ele.finishedDate}</h5>
            <div style={{display: "flex"}}>
              <button onClick={()=>handleupdate(ele._id)}>Update</button>
              <button onClick={()=>handledelete(ele._id)}>Delete</button>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default Home


// export default Home