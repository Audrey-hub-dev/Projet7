

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

import { Button } from "react-bootstrap";
import MainScreen from "../components/MainScreen";

import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faThumbsUp, faTrashCan, faFile } from '@fortawesome/free-regular-svg-icons';

import jwt_decode from 'jwt-decode'
import { deletePostAction } from "../actions/postsActions";

import "./Home.css"



function Home() {

    const [listOfPosts, setListOfPosts] = useState([])
    var token = sessionStorage.getItem('userInfo')
    var decoded = jwt_decode(token);
    var decodedId = decoded.id
    var decodedAdmin = decoded.admin 

let history = useHistory()

const dispatch = useDispatch();
const [likedPosts, setLikedPosts] = useState(0)





const deleteHandler = (id) => {
  if (window.confirm("Are you sure?")) {
    dispatch(deletePostAction(id));
    window.location.reload("/");
 
  }
};


  useEffect(() => {
      
    axios.get("http://localhost:3000/api/posts",
    
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("userInfo") }
          })
            .then((response) => {
              //console.log(response.data.listOfPosts)
              setListOfPosts(response.data.listOfPosts)
              //console.log(response.data.likedPosts)
              //setLikedPosts(response.data.likedPosts)
              //console.log(response.data.likedPosts.map((like) => {
               // return like.postsLId}))
              setLikedPosts(response.data.likedPosts.map((like) => {
                return like.postsLId}))
              
            })
                 
      }, []);

  
     
      const likeAPost = (postId) => {
        

        axios.post("http://localhost:3000/api/likes", {
             postsLId: postId
         
        },
            {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("userInfo") }
              })
                .then((response) => {
                  //console.log(response.data)
                
                    setListOfPosts(
                    listOfPosts.map((post) => {
                      
                    if (post.id === postId) {
                        if (response.data.likedPosts) {
                        //display like +1 (created), 0 is used to add one like
                        //post.Likes.push()
                        return { ...post, Likes: [...post.Likes, 0 ] };
                      } else {
                       //display like-1 (cancelled)
                       const likesArray = post.Likes;
                        likesArray.pop();
                        return { ...post, Likes: likesArray };
                      }
                      
 
                    } else {
                       return post;
                      }
                    
                  })

              
                  )
                  
            
              //si le tableau contient une valeur 
              //dans le post , on met à jour le tableau avec l'id du like,
              //et on ajoute seulement si l'id du like n'est pas présent 
              if (likedPosts.includes(postId)) {
                setLikedPosts(
                  likedPosts.filter((id) => {
                    return id !== postId;
                  })
                );
              } else {
                setLikedPosts([...likedPosts, postId]);
              }
        
            });
        };
                  
    return (

      <MainScreen title={`Welcome Back ${decoded && decoded.email}`}>

      <Link to="/createnote">
        <Button>
          Create new Post
        </Button>
      </Link>
    <article>
    <div className="Home">
        {listOfPosts.map((value, key) => (
            <div key={key} className="Post">


      { (decodedAdmin === true || decodedId === value.userId) &&   (
                <div className="Buttons">
              <p className="Edit">
                <FontAwesomeIcon icon={faFile} 
                  color="#FD2D01"
                onClick={() => history.push(`/note/${value.id}`)}>
                </FontAwesomeIcon>
                Edit
              </p>
              <p className="Delete">
              <FontAwesomeIcon icon={faTrashCan} 
                color="#FD2D01"
                onClick={() => deleteHandler(value.id)}>
                 
              </FontAwesomeIcon>
              Delete
              </p>

            </div>
      )}
                  <div className="Title"> {value.title}
                  </div>
                  <div className="Image">
                 
                  <img src={value.image} alt="" />
                </div>
                <div className="User"> By {value.userId} 
                </div>
                <div className="Content"
                  onClick={() => {
                    history.push(`/postcomments/${value.id}`);
                  } }
                > {value.content}
                </div>
                <div className="Engagement">

                <div className="Like">
                <p>Likes</p>
                <FontAwesomeIcon icon={faThumbsUp}
                    color="#4E5166"
                       onClick={() => {
                           likeAPost(value.id);    
                       }}
                />
               
                <label>{value.Likes.length}</label>
              
                </div>
                      
                  <div className="Comment">
                  <p>Comments</p>
                  <FontAwesomeIcon icon={faComments}
                   color="#4E5166"
                    onClick={() => history.push(`/postcomments/${value.id}`)}
                  />
                
                
                
                   
                  </div>
                  

    
</div>
</div>

        ))}
        
        </div>
        </article>
</MainScreen>

         
          
    )
    
                        }
                        export default Home; 

                        
