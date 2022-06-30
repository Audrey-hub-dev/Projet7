import React, { useEffect, useState } from "react";
import Main from "../../components/Main";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./UpdatePost.css";


function UpdatePost ({ match, history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState([]);
  const [date, setDate] = useState("");


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




const updateHandler = (e) => {
  e.preventDefault()

  const formData = new FormData();
  formData.append("file", image[0]);
  formData.append("title",title);
  formData.append("content", content);


  axios
    .put(
      `http://localhost:3000/api/posts/${match.params.id}`, formData,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("userInfo"),
        },
      }
    )
    .then((response) => {
        history.push('/')
      })
};















  return (
    <Main title="Edit your Post">
      <form className= "form-update-post" onSubmit={updateHandler}>
        <label htmlFor="update-title">Title</label>
        <br />
          <input
            id="update-title"
            type="title"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label htmlFor="update-content">Content</label>
          <br />
          <textarea
            id="update-content"
            as="textarea"
            placeholder="Enter the content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {content && (
            <><p>Note Preview</p><ReactMarkdown>{content}</ReactMarkdown></>
          )}
          <label htmlFor="update-image">Image</label>
          <br />
          <input
            id="update-content"
            type="file"
            name="file"
            onChange={(e) => setImage(e.target.files)}
          />
          <br />
          <div className="buttons">
          <button type="submit">
            Update Post
          </button>
            <br />
         
          </div>
      </form>
      <footer>
        Updated on - {date.substring(0, 10)}
      </footer>
    </Main>
  );
}

export default UpdatePost

