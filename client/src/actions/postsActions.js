import {
    COMMENTS_DELETE_FAIL,
    COMMENTS_DELETE_REQUEST,
    COMMENTS_DELETE_SUCCESS,
    POSTS_DELETE_FAIL,
    POSTS_DELETE_REQUEST,
    POSTS_DELETE_SUCCESS,
    POSTS_UPDATE_FAIL,
    POSTS_UPDATE_REQUEST,
    POSTS_UPDATE_SUCCESS,
  } from "../constants/postConstants";
  import axios from "axios";
  
  export const deletePostAction = (id) => async (dispatch) => {
    try {
      dispatch({
        type: POSTS_DELETE_REQUEST,
      });
  
      const config = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("userInfo")
        },
      };
  
      const { data } = await axios.delete(`http://localhost:3000/api/posts/${id}`, config);
  
      dispatch({
        type: POSTS_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSTS_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const updatePostAction = (id, title, content, image) => async (
    dispatch
  ) => {
    try {
      dispatch({
        type: POSTS_UPDATE_REQUEST,
      });
  
      const config = {
        headers: {
         // "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("userInfo")
          },
        };

        const formData = new FormData();
        formData.append("file", image[0]);
        formData.append("title",title);
        formData.append("content", content);
  
    
         await axios.put(`http://localhost:3000/api/posts/${id}`, formData,
        config)
      
  
      dispatch({
        type: POSTS_UPDATE_SUCCESS,
        payload: formData,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSTS_UPDATE_FAIL,
        payload: message,
      });
    }
  };


  export const deleteCommentAction = (id) => async (dispatch) => {
    try {
      dispatch({
        type: COMMENTS_DELETE_REQUEST,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("userInfo")
        },
      };
  

      const { data } = await axios.delete(`http://localhost:3000/api/comments/${id}`, config);
  
      dispatch({
        type: COMMENTS_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENTS_DELETE_FAIL,
        payload: message,
      });
    }
  };
