import React,{useState} from "react";
import "./Login.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = ({setLoginUser})=>{

    const navigate=useNavigate();

    const [user,setUser]=useState({
        email:"",
        password:""
    })

    const handleChange= (e)=>{
        const {name,value}=e.target;
        setUser({
            ...user,
            [name]:value
        })
    }

    const login= ()=>{
        const {email,password}=user;
        if(email && password){
            axios.post("http://localhost:4500/login",user) // to send user object info to backend to store in DB
            .then(res=>{
                alert(res.data.message); // will be executed after post
                setLoginUser(res.data.user);
                navigate("/");
            });
        }else{
            alert("invalid input");
        }
    }

    return(
        <div className="login">
            {console.log(user)}
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your password"></input>
            <div className="forget" onClick={()=>navigate("/forgot-password")}>Forget Password</div>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={()=>navigate("/register")}>Register</div>
        </div>
    );
}

export default Login;