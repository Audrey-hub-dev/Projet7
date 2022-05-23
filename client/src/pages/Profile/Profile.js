import React, { useEffect, useState } from 'react' 
import Axios from 'axios'
import { Image } from 'cloudinary-react' 
import './Profile.css'




function Profile() {



    const [yourPosts, setYourPosts] = useState([])

    useEffect(() => {
        Axios.get(`http://localhost:3001/byUser/${localStorage.getItem("username")}`) 
        .then((response) => {
            setYourPosts(response.data);
        })
    })

    /*
    const [role, setRole] = useState("");

    Axios.defaults.withCredentials = true; 
    
    useEffect (() => {
       
        Axios.get("http://localhost:3001/login")
        .then((response) => {
            if (response.data.loggedIn === true) {
                setRole(response.data.user[0].role);
                console.log (response.data); 
            }
        });
    }, []); 



/*
    const [isAdmin,setIsAdmin] = useState({role} === "ADMIN") 
        useEffect(()=>{setIsAdmin({role}=== "ADMIN")})
    
   */ 

        //<p className="Role">{role}</p>
    return (

        <div className="Profile">
            <h1>{localStorage.getItem("username")}</h1> 
          

            {yourPosts.map((val) => {
                return (
                    <div className="Post">
                        <div className="Image">
                            <Image cloudName="dvxxwsmf6" publicId={val.imageURL}/>
                        </div>
                        <div className="Content">
                            <div className="title">{""} {val.title} / by @{val.author}</div>
                            <div className="description">{val.description}</div>
                        </div>
                        <div className="Like">{val.likes}</div>
                             
                      
                        <><button click="onModify()">MODIFY</button><button click="onDelete()">DELETE</button></>
                    
                    </div>
                )
            })}
        </div>

    )
}
        

export default Profile
