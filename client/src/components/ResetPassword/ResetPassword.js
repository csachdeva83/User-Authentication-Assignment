import React,{useState} from "react";
import "./ResetPassword.css";
import axios from "axios";
import {useNavigate,useParams} from "react-router-dom";

const ResetPassword = ()=>{

    const navigate=useNavigate();

    const [user,setUser]=useState({
        ONEpassword: "",
        TWOpassword: ""
    })

    const {id,token}=useParams();

    const handleChange= (e)=>{
        const {name,value}=e.target;
        // console.log(name,value);
        setUser({
            ...user,
            [name]:value
        })
    }

    const resetPassword=()=>{
        const {ONEpassword,TWOpassword}=user;
        console.log(ONEpassword,TWOpassword);
        if(ONEpassword && TWOpassword){
            alert("posted");
            axios.post(`http://localhost:4500/reset-password/${id}/${token}`,user) // to send user object info to backend to store in DB
            .then(res=>{
                alert(res.data.message); // will be executed after post
                navigate("/login");
            });
        }else{
            alert("invalid input");
        }
    }

    return(
        <div className="resetPassword">
            <h1>Reset Password</h1>
            <input type="password" name="ONEpassword" value={user.ONEpassword} placeholder="Enter new Password" onChange={handleChange}></input>
            <input type="password" name="TWOpassword" value={user.TWOpassword} placeholder="Confirm new Password" onChange={handleChange}></input>
            <div className="button" onClick={resetPassword}>Submit</div>
        </div>
    );
}

export default ResetPassword;