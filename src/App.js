import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./register/register";
import Login from "./login/login";
import Home from "./home/home";
// import Posttodo from "./posttodo/posttodo";
import ToDoForm from "./posttodo/posttodo";
import UpdatePage from "./update/update";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/posttodoitem" element={<ToDoForm />} />
          <Route path="/updateitem/:id" element={<UpdatePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
