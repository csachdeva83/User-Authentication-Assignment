import React,{useState} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Homepage from "./components/Home Page/Homepage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {

  const [user,setLoginUser]=useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={(user && user._id)?<Homepage name={user.name} setLoginUser={setLoginUser}/>:<Login setLoginUser={setLoginUser} />} />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
