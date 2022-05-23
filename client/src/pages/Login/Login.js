import React from "react";
import "./Login.css"; 
import { useState } from "react";
import Axios from 'axios'; 
//import { useHistory } from 'react-router-dom'; 


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    const [errorMessage, setErrorMessage] = useState("");
    //let history = useHistory()
  

    Axios.defaults.withCredentials = true; 

    const login = () => {
        Axios.post("http://localhost:3001/login", {
        username: username,
        password: password,
        })
            .then((response) => {

                if (response.data.loggedIn) {
                    localStorage.setItem("loggedIn", true)
                    localStorage.setItem("username", response.data.username);
                    //history.push("/")
                } else {
                    setErrorMessage(response.data.message)
                }
                
               console.log(response)
            })
    }


    return (
        <div className="SignIn">
            <h1>Login</h1>
            <div className="SignInForm">
                <input
                    type="text"
                    placeholder="Username..."
                    onChange={(event) => {
                        setUsername(event.target.value);
                }}
                />
                
                <input 
                    type="password" 
                    placeholder="password" 
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <button onClick={login}>Sign in</button>
                <p style={{ color: "red" }}>{errorMessage} </p>
              
             
              
            </div>
        </div>
    )

}
export default Login 