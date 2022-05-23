import React, {useEffect, useState} from 'react';
import "./Home.css";
import { Image } from "cloudinary-react";
import Axios  from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


function Home() {


const [role, setRole] = useState("");

Axios.defaults.withCredentials = true; 

useEffect(() => {
    Axios.get("http://localhost:3001/login")
    .then((response) => {
        console.log(response)
        if (response.data.loggedIn === true) {
        setRole(response.data.user[0].role);
        console.log (response.data); 
    }
})
}, []); 
    


    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (!localStorage.getItem("loggedIn")) {
            localStorage.setItem("loggedIn", false);
        }
    }, []
    );
 

    //pour récupérer tous les posts de tout le monde, accès à la table mysql Posts avec la route get
    useEffect(() => {
        Axios.get("http://localhost:3001/")//problème de route not found
        .then((response) => {
            setPosts(response.data); 
            console.log(response.data);
        }); 

    }, [] 
    );

    
    const likePost = (id, key) => {
        var tempLikes = posts;
        tempLikes[key].likes = tempLikes[key].likes + 1; 

        Axios.post("http://localhost:3001/post/like", {userLike: localStorage.getItem("username"),
            postId: id })
            .then((response) => {   
                setPosts(tempLikes);  
            });
    }

        //si l'utilisateur est admin j'ajoute {role === "admin" && ()} pour que seuls les admins
        //puissent voir les boutons modify et delete
 
        return (

                <div className="Home">
                <p>{localStorage.getItem("username")}</p>
                   <p>{role}</p>
                
        
                    {posts.map((val, key) => {

                      
                        return (             
                             <div className="Post"> 
                             
                                <div className="Image">
                                    <Image cloudName="dvxxwsmf6" publicId={val.imageURL}/>
                                </div>
                                <div className="Content">
                                    <div className="title">{""} {val.title} / by @{val.author}</div>
                                    <div className="description">{val.description}</div>
                                </div>
                                <div className="Like">
                                <FontAwesomeIcon icon={faHeart} 
                                    className="likeButton"
                                    onClick={() => {
                                        likePost(val.id, key);    
                                    }}>
                                </FontAwesomeIcon>
                                {val.likes}
                                </div>
                              
                                {role === "admin" && (

                                    <><button click="onModify()">MODIFY</button><button click="onDelete()">DELETE</button></>
                               
                                )}
                             
                            </div>
                        
                        )
                                
                        
                    })}
                
                </div>
        )
}
                  
                                 

export default Home






