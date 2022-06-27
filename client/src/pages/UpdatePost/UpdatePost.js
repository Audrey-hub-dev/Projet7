import React, { useEffect, useState } from "react";
import Main from "../../components/Main";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deletePostAction, updatePostAction } from "../../actions/postsActions";
import ReactMarkdown from "react-markdown";
import "./UpdatePost.css";


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
    <Main title="Edit your Post">
      <form className= "form-update-post" onSubmit={updateHandler}>
        <label>Title</label>
        <br />
          <input
            type="title"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label>Content</label>
          <br />
          <textarea
            as="textarea"
            placeholder="Enter the content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {content && (
            <><p>Note Preview</p><ReactMarkdown>{content}</ReactMarkdown></>
          )}
          <label>Image</label>
          <br />
          <input
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
          <button
           onClick={() => deleteHandler(match.params.id)}
          >
            Delete Note
          </button>
          </div>
      </form>
      <footer>
        Updated on - {date.substring(0, 10)}
      </footer>
    </Main>
  );
}

export default SingleNote;

