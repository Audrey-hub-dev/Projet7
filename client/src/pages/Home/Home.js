
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Main from "../../components/Main";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faThumbsUp, faTrashCan, faFile } from '@fortawesome/free-regular-svg-icons';
import jwt_decode from 'jwt-decode';
import "./Home.css"



function Home() {
  const [listOfPosts, setListOfPosts] = useState([])
  var token = sessionStorage.getItem('userInfo')
  var decoded = jwt_decode(token);
  var decodedId = decoded.id
  var decodedAdmin = decoded.admin 
  let history = useHistory()

  const [likedPosts, setLikedPosts] = useState(0)

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    axios
      .delete(`http://localhost:3000/api/posts/${id}`,
      {
        headers: { 
          Authorization: "Bearer " + sessionStorage.getItem("userInfo") },
      })
      .then(() => {
        window.location.reload("/");

      });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/posts",
    { headers: {
        Authorization: "Bearer " + sessionStorage.getItem("userInfo") }
    })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts)
          setLikedPosts(response.data.likedPosts.map((like) => {
            return like.postsLId}))
          })               
  }, []);

    const likeAPost = (postId) => {
      axios.post("http://localhost:3000/api/likes", {
        postsLId: postId }, { headers: {
          Authorization: "Bearer " + sessionStorage.getItem("userInfo") }
          })
            .then((response) => {
              setListOfPosts(
                listOfPosts.map((post) => {
                    if (post.id === postId) {
                      if (response.data.likedPosts) {
                        //display like +1 (created), 0 is used to add one like
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
              //if array contains like value in post
              // update array postId only if postId doesn't equal to current id of post
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
      <Main title={`Welcome Back ${decoded && decoded.email}`}>
      <Link to="/createpost">
        <Button alt="create-post-button">
          Create new Post
        </Button>
      </Link>
      <article>
        <div className="home">
          {listOfPosts.map((value, key) => (
            <div key={key} className="post">
              { (decodedAdmin === true || decodedId === value.userId) &&  (
                <div className="buttons">
                  <p className="edit">
                    <FontAwesomeIcon icon={faFile} alt="edit-button"
                    color="#FD2D01"
                    onClick={() => history.push(`/post/${value.id}`)}>
                    </FontAwesomeIcon>
                    Edit
                  </p>

                  <p className="delete">
                    <FontAwesomeIcon icon={faTrashCan} alt="delete-button"
                    color="#FD2D01"
                    onClick={() => deleteHandler(value.id)}>
                    </FontAwesomeIcon>
                    Delete
                  </p>
                </div>
              )}
                <h2 className="title"> {value.title}</h2>
                <div className="image">
                  <img src={value.image} alt="post-pic-uploaded" />
                </div>
                <h3 className="user"> By {value.userId}</h3>
                <h4 className="content"
                  onClick={() => {
                  history.push(`/postcomments/${value.id}`);
                  }}
                  > 
                  {value.content}
                </h4>
                <div className="engagement">
                  <div className="like">
                    <p>Likes</p>
                      <FontAwesomeIcon icon={faThumbsUp} alt="like-button"
                      color="#4E5166"
                      onClick={() => {
                        likeAPost(value.id);    
                      }}
                      />
                    <label>{value.Likes.length}</label>
                  </div>
                    <div className="comment">
                      <p>Comments</p>
                        <FontAwesomeIcon icon={faComments} alt="comment-button"
                        color="#4E5166"
                        onClick={() => history.push(`/postcomments/${value.id}`)}
                        />
                    </div>
                </div>
                <div className="created-at">
                    Created on{" "}
                        {value.createdAt.substring(0, 10)}
                </div>
                <div className="updated-at">
                    Updated on{" "}
                      {value.updatedAt.substring(0,10)}
                </div>
            </div>
          ))}
        </div>
      </article>
      </Main>      
    )
}

export default Home; 

                        
