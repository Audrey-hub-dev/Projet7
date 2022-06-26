import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare} from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import jwt_decode from 'jwt-decode'
import { deleteCommentAction } from "../actions/postsActions";
import { useDispatch } from 'react-redux';
import MainScreen from "../components/MainScreen";
import "./PostComments.css";



function Post() {
  let { id } = useParams();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("")

  var token = sessionStorage.getItem('userInfo')
  var decoded = jwt_decode(token);
  var decodedId = decoded.id;
  var decodedAdmin = decoded.admin 

 const dispatch = useDispatch()

  let history = useHistory();

  useEffect(() => {

    axios.get(`http://localhost:3000/api/posts/${id}/comments`, {
        headers: { 
            Authorization: "Bearer " + sessionStorage.getItem("userInfo") },
      })
      .then((response) => {
        setComments(response.data) 
        //console.log(response.data)
       
        });
    
  }, []);

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
        if (response.data.error) {
          //console.log(response.data.error);
        } else {
          const commentToAdd = {
            comment: comment, 
          };
          setComments([...comments, commentToAdd]);
          setComment("");
          window.location.reload(`/postcomment/${id}`)
        }
      });
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCommentAction(id));
      window.location.reload(`/postcomment/${id}`);
   
    }
  };

    
  return (
    <MainScreen title={`Welcome Back ${decoded && decoded.email}`}>

    <div className="PostComments">
       
        <div className="listOfComments">
          {comments?.map((value, key) => (
            
              <div key={key} className="comment">
                  <div className= "user">By {value.usersId} </div>
                  <div className= "comment"> Comment: {value.comment} </div>
           
                
         <div className="buttons">
                { (decodedAdmin === true || decodedId === value.usersId) &&   (
           <><div className="modify">
                          <FontAwesomeIcon icon={faPenToSquare}
                             color="#FD2D01"
                              onClick={() => history.push(`/updatecomment/${value.id}`)}>
                          </FontAwesomeIcon>
                      </div><div className="delete">

                              <FontAwesomeIcon icon={faTrashCan}
                                 color="#FD2D01"
                                  onClick={() => deleteHandler(value.id)}>
                              </FontAwesomeIcon>

                          </div></>


            )}

              </div>
              </div>
            
          ))}





        </div>



        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />

          <FontAwesomeIcon icon={faPlus}
            onClick={addComment}
          />
        </div>










      </div>
  </MainScreen>
  );
}

export default Post;