import React, { useEffect, useState } from 'react'
import './Navbar.css'




function Navbar() {
   
const [loggedIn, setLoggedIn] = useState(true)

useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"))}, 
    [localStorage.getItem("loggedIn")])

  
    return (
        <div className="Navbar">
            <a href="/">Home</a>
            {loggedIn ? (
                <>
              
                <a href="/post">Post</a>
                <a href="/profile">Profile</a> 
              
                </>
            ) : (
                <>    
                <a href="/signUp">SignUp</a> 
                <a href="/login">Login</a>
                </>
            )}
            
        </div>
    )
}
export default Navbar