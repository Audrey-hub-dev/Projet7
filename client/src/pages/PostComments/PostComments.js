import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, } from '@fortawesome/free-regular-svg-icons';
import jwt_decode from 'jwt-decode'
import Main from "../../components/Main";
import "./PostComments.css";



function Post() {
  let { id } = useParams();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("")
  var token = sessionStorage.getItem('userInfo')
  var decoded = jwt_decode(token);
  var decodedId = decoded.id;
  var decodedAdmin = decoded.admin 
  let history = useHistory();

  useEffect(() => {

    axios.get(`http://localhost:3000/api/posts/${id}/comments`, {
        headers: { 
            Authorization: "Bearer " + sessionStorage.getItem("userInfo") },
      })
      .then((response) => {
        setComments(response.data) 
      });
    
  }, [id]);

  

  const addComment = () => {
    axios
      .post(
        "http://localhost:3000/api/comments",
        {
          comment: comment,
          postsId: id,
          usersId: decoded.id
        
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("userInfo"),
          },
        }
      )
      .then((response) => {
          const commentToAdd = {
            comment: comment, 
          };
          setComments([...comments, commentToAdd]);
          setComment("");
          window.location.reload(`/postcomment/${id}`)
      })    
    
  };


  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    axios
      .delete(`http://localhost:3000/api/comments/${id}`,
      {
        headers: { 
          Authorization: "Bearer " + sessionStorage.getItem("userInfo") },
      })
      .then(() => {
        window.location.reload(`/postcomment/${id}`);

      });
    }
  };



  return (
    <Main title={`Welcome Back ${decoded && decoded.email}`}>
      <div className="post-comments">
        <div className="list-of-comments">
          {comments?.map((value, key) => (
            <div key={key} className="comment">
              <div className= "user">By {value.usersId} </div>
              <div className= "comment"> Comment: {value.comment} </div>
              <div className="buttons">
                { (decodedAdmin === true || decodedId === value.usersId) &&   (
                  <><div className="modify">
                        <FontAwesomeIcon icon={faPenToSquare} alt="edit-comment"
                          color="#FD2D01"
                          onClick={() => history.push(`/updatecomment/${value.id}`)}>
                        </FontAwesomeIcon>
                      </div>
                      
                      <div className="delete">
                        <FontAwesomeIcon icon={faTrashCan} alt="delete-comment"
                          color="#FD2D01"
                           onClick={() => deleteHandler(value.id)}>
                        </FontAwesomeIcon>
                      </div></>
                )}
              </div>
              <div className="comment-created-at">
                  Created on{" "}
                    {value.createdAt.substring(0,10)}
              </div>
              <div className="comment-updated-at">
                  Updated on{" "}
                      {value.updatedAt.substring(0,10)}
              </div>

            </div>
          ))}
        </div>
        <div className="add-comment-container">
          <form>
          <label htmlFor="text" className="write-comment">Comment</label>
          <br />
          <input
            id="text"
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
          </form>
           <button onClick={addComment} className="button-add-comment"> Add Comment</button>
        </div>
      </div>
    </Main>
  );
}

export default Post;