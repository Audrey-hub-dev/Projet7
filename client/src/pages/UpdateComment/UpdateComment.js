import React, { useEffect, useState } from "react";
import Main from "../../components/Main";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./UpdateComment.css";


function UpdateComment({ match, history}) {
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");


  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/comments/${match.params.id}`, {
        headers: {Authorization :  "Bearer " + sessionStorage.getItem("userInfo") } });
          setComment(data.comment);
          setDate(data.updatedAt);
    }
    fetching();
  
  }, [match.params.id, date]);


  const updateComment = (e) => {
    e.preventDefault()

    axios
      .put(
        `http://localhost:3000/api/comments/${match.params.id}`,
        {
          comment: comment,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("userInfo"),
          },
        }
      )
      .then((response) => {
          setComment(response.data)
          history.push('/')
        })
  };

  return (
    <Main title="Edit your Comment">
       <form className= "form-update-comment">
        <label htmlFor="update-comment">Comment</label>
        <br />
          <input
            id="update-comment"
            as="textarea"
            placeholder="Enter the comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            />
          {comment && (
          <><p>Note Preview</p><ReactMarkdown>{comment}</ReactMarkdown></>
          )}
        <button
          onClick={updateComment} 
          alt="update-button"> 
            Update Comment
        </button>
       
      </form>
    </Main>
  );
}

export default UpdateComment; 
