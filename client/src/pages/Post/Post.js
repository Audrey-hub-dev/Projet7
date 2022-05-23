import React from 'react'
import "./Post.css"
import Axios from 'axios'; 

import { useState } from 'react';

import { useHistory} from 'react-router-dom';




function Post() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState([]);
    

    let history = useHistory();
    
    const upload = () => {
      const formData = new FormData();
      formData.append("file", imageURL[0]);
      
      //formData.append("upload_preset",process.env.REACT_APP_UPLOAD_PRESET)
      Axios.post(
        "https://api.cloudinary.com/v1_1/dvxxwsmf6/image/upload",
        formData)
        .then((response) => {
        const fileName = response.data.public_id;
          //envoie au backend 
          Axios.post("http://localhost:3001/post", {
          title: title,
          description: description,
          imageURL: fileName,
          author: localStorage.getItem("username"),
          })
          .then(() => {
            history.push("/"); 
          });
        });
      }
    

    return (
      <div className="post">
        <h1>Create A Post</h1>
        <div className="postForm">
          <input
            type="text"
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Description..."
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <input
          type="file"
       
          onChange={(e) => setImageURL(e.target.files)}
       
        />
         
          <button onClick={upload}>Upload</button>
        
          
        </div>
      </div>
    )
}
    
    
export default Post; 

  


   

  