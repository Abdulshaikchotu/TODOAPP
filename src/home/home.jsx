import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';

let Home = () => {
  let [data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let token = window.localStorage.getItem('token');
  let navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      let url = 'https://todoapp-backend-yoii.onrender.com/aftersuccessfullogin/getalltododata';
      await axios
        .get(url, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res);
          setData(res.data.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    getData();
  }, [token]);

  //logout
  let handleLogout = () => {
    window.localStorage.clear('token');
    navigate('/login');
    // window.location.reload(false)
  };

  //posttodo
  let handlePost = () => {
    navigate('/posttodoitem');
  };
  let handleHome = () => {
    navigate('/home');
  };

  //update todo
  let handleUpdate = (id) => {
    navigate(`/updateitem/${id}`);
  };

  //delete todo
  let handleDelete = (id) => {
    let url = `https://todoapp-backend-yoii.onrender.com/aftersuccessfullogin/deletedata/${id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        let updatedData = data.filter((item) => item._id !== id);
        setData(updatedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="home">
      <div id="nav-parent">
        <ul className="items">
          <li onClick={() => handleHome()}>Home</li>
          <li onClick={() => handlePost()}>ADDTODO</li>
          <li onClick={() => handleLogout()}>logout</li>
        </ul>
      </div>
      <div id="fetchingdata">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data.map((ele, i) => {
            return (
              <div key={ele._id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid' }}>
                <h1>PersonalData</h1>
                <h5>ToDOItem:{ele.toDoItem}</h5>
                <h5>DueDate:{ele.dueDate}</h5>
                <h5>priorityLevel:{ele.priorityLevel}</h5>
                <h5>starred:{ele.starred}</h5>
                <h5>CreationDate:{ele.creationDate}</h5>
                <h5>finishedDate:{ele.finishedDate}</h5>
                <div style={{ display: 'flex' }}>
                  <button onClick={() => handleUpdate(ele._id)}>Update</button>
                  <button onClick={() => handleDelete(ele._id)}>Delete</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
