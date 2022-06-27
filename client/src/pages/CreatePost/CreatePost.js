
import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Main from "../../components/Main";
import "./CreatePost.css";

function Upload() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState([]);
  let history = useHistory();

    const upload = () => {
        const formData = new FormData();
        formData.append("file", image[0]);
        formData.append("title",title);
        formData.append("content", content);

        Axios.post("http://localhost:3000/api/posts", formData, {
            headers: { Authorization : "Bearer " + sessionStorage.getItem("userInfo")}
            }
            ).then((response) => {
                history.push("/");
            });
    };

  return (
    <Main title="Create a Post">
        <div className="upload">
          <form className="form-create-post">
              <label>Title</label>
              <br/>
              <input
                  type="text"
                  placeholder="Title..."
                  onChange={(event) => {
                      setTitle(event.target.value);
                  } } />
                  <br/>
                  <label>Description</label>
                  <br/>

              <textarea
                  type="text"
                  placeholder="Description..."
                  onChange={(event) => {
                      setContent(event.target.value);
                  } } />

                  <br/>
                  <label>Image</label>
                  <br/>

              <input
                  type="file"
                  name="file"
                  onChange={(event) => setImage(event.target.files)} />
                  <br/>

              <button onClick={upload}>Upload</button>
          </form>
      </div>
    </Main>
  );
}

export default Upload;
