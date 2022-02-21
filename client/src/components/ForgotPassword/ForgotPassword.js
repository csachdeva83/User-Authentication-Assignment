import React,{useState} from "react";
import "./ForgotPassword.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ForgotPassword = ()=>{

    const navigate=useNavigate();

    const [user,setUser]=useState({
        email:""
    })

    const handleChange= (e)=>{
        const {name,value}=e.target;
        // console.log(name,value);
        setUser({
            [name]:value
        })
    }

    const forgotPassword=()=>{
        const {email}=user;
        if(email){
            alert("posted");
            axios.post("http://localhost:4500/forgot-password",user) // to send user object info to backend to store in DB
            .then(res=>{
                alert(res.data.message); // will be executed after post
                // navigate("/login");
            });
        }else{
            alert("invalid input");
        }
    }

    return(
        <div className="forgotPassword">
            <h1>Forgot Password</h1>
            <input type="text" name="email" value={user.email} placeholder="Enter your Email" onChange={handleChange}></input>
            <div className="button" onClick={forgotPassword}>Submit</div>
        </div>
    );
}

export default ForgotPassword;