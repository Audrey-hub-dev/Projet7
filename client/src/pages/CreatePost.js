
import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

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
  
    <div className="Upload">
          <h1>Create A Post</h1>
          <div className="UploadForm">
              <input
                  type="text"
                  placeholder="Title..."
                  onChange={(event) => {
                      setTitle(event.target.value);
                  } } />
              <input
                  type="text"
                  placeholder="Description..."
                  onChange={(event) => {
                      setContent(event.target.value);
                  } } />

              <input
                  type="file"
                  name="file"
                  onChange={(event) => setImage(event.target.files)} />

              <button onClick={upload}>Upload</button>
          </div>
      </div>
  );
}

export default Upload;
