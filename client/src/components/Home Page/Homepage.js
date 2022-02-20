import React from "react";
import "./Homepage.css";

const Homepage = ({name,setLoginUser})=>{
    return(
        <div className="homepage">
            <h1>Hello {name}</h1>
            <div className="button" onClick={()=> setLoginUser({})}>Logout</div>
        </div>
    );
}

export default Homepage;