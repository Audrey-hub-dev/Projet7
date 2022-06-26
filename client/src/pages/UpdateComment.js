import React, { useEffect, useState } from "react";
import MainScreen from "../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteCommentAction } from "../actions/postsActions";

import ReactMarkdown from "react-markdown";


function UpdateComment({ match, history}) {
  const [comment, setComment] = useState("");
 
  const [date, setDate] = useState("");
  const dispatch = useDispatch();



  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCommentAction(id));
    }
    history.push("/")

  };


  useEffect(() => {
   
    const fetching = async () => {

      const { data } = await axios.get(`http://localhost:3000/api/comments/${match.params.id}`, {
        headers: {Authorization :  "Bearer " + sessionStorage.getItem("userInfo") } });

      setComment(data.comment);
      setDate(data.updatedAt);
    }
    fetching();
  

  }, [match.params.id, date]);

  const updateComment = () => {

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
        if (response.data.error) {
          console.log(response.data.error);
        } else {
         
          };
         // setComments([...comments, commentToEdit]);
          setComment("");
          history.push('/')
       

             
        
        })
      
  };

  return (
    <MainScreen title="Edit your Comment">
      <Card>
        <Card.Header>Edit your Comment</Card.Header>
        <Card.Body>
         
            
          <Form.Group controlId="newComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            {comment && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{comment}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

         
          
            <button onClick={updateComment}> Update Comment</button>
            <Button
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Comment
            </Button>
            </Card.Body>
        <Card.Footer className="text-muted">
         Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default UpdateComment; 
