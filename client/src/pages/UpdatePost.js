import React, { useEffect, useState } from "react";
import MainScreen from "../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deletePostAction, updatePostAction } from "../actions/postsActions";

import ReactMarkdown from "react-markdown";



function SingleNote({ match, history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState([]);
  const [date, setDate] = useState("");

  const dispatch = useDispatch();


  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePostAction(id));
    }
    history.push("/");
    window.location.replace("/");
  };


  useEffect(() => {
   
    const fetching = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/posts/${match.params.id}`, {
        headers: {Authorization :  "Bearer " + sessionStorage.getItem("userInfo") } });
  
      setTitle(data.title);
      setContent(data.content);
      setImage(data.image);
      setDate(data.updatedAt);
    
    };

    fetching();
  

  }, [match.params.id, date]);


  const resetHandler = () => {
    setTitle("");
    setContent("");

  };


  const updateHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image[0]);

    dispatch(updatePostAction(match.params.id, title, content, image));
    if (!title || !content || !image) return;

    resetHandler();
    history.push("/");
    window.location.reload("/");
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}
         <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                
                type="file" 
                name="file"
           
                onChange={(e) => setImage(e.target.files)}
              />
            </Form.Group>
           
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;

