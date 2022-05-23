import React from "react";
import { useState } from "react";

import "./SignUp.css"

import Axios from 'axios'




function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    
    Axios.defaults.withCredentials = true; 

    const signup = () => {
        Axios.post("http://localhost:3001/user/signup",{
        username: username,
        email: email,
        password: password})
            .then((response) => {
                console.log(response); 
            })
    }


    return (
        <div className="SignUp">
            <h1>Registration</h1>
            <div className="SignUpForm">
                <input
                    type="text"
                    placeholder="Username..."
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
                <input 
                    type="text" 
                    placeholder="email" 
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <input 
                    type="password" 
                    placeholder="password" 
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <button onClick={signup}>Sign up</button>
            </div>
            
        </div>


    )
                
}
export default SignUp


