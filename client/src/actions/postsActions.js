import {
    COMMENTS_DELETE_FAIL,
    COMMENTS_DELETE_REQUEST,
    COMMENTS_DELETE_SUCCESS,
    POSTS_DELETE_FAIL,
    POSTS_DELETE_REQUEST,
    POSTS_DELETE_SUCCESS,
    COMMENTS_LIST_FAIL,
    COMMENTS_LIST_REQUEST,
    COMMENTS_LIST_SUCCESS,
    POSTS_UPDATE_FAIL,
    POSTS_UPDATE_REQUEST,
    POSTS_UPDATE_SUCCESS,
    COMMENTS_UPDATE_FAIL,
    COMMENTS_UPDATE_REQUEST,
    COMMENTS_UPDATE_SUCCESS,
    GET_POSTS,


  

  } from "../constants/postConstants";
  import axios from "axios";
  
  
  
  export const listComments= (id) => async (dispatch) => {
    try {
      dispatch({
        type: COMMENTS_LIST_REQUEST,
      });
  
    
      const config = {
        headers: {
            //Authorization: `Bearer ${userInfo.token}`,
            Authorization :  "Bearer " + sessionStorage.getItem("userInfo")
        },
      };
  
     const {data} =  await axios.get(`http://localhost:3000/api/posts/${id}/comments`,
      config);
  
      dispatch({
        type: COMMENTS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENTS_LIST_FAIL,
        payload: message,
      });
    }
  };


/*
export const getComments = (id, num) => {
    return (dispatch) => {
      return axios
        .get(`http://localhost:3000/api/posts/${id}/comments`, {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("userInfo")
          },
        })
        .then((res) => {
          const array = res.data.slice(0, num);
          dispatch({ type: GET_COMMENTS, payload: array });
        })
        .catch((error) => console.log(error));
    };
  };
*/



  /*
  export const createPostAction = (title, content, image) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: POSTS_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo }
      } = getState();
  
      const config = {
        headers: {
          //"Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("userInfo")
        },
      };
  
      const formData = new FormData();
      formData.append("file", image[0]);
      formData.append("title",title);
      formData.append("content", content);

     await axios.post(`http://localhost:3000/api/posts`, formData, 
      config);
        
      dispatch({
        type: POSTS_CREATE_SUCCESS,
        payload: formData,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSTS_CREATE_FAIL,
        payload: message,
      });
    }
  };
  */

  export const deletePostAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
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
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: POSTS_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
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


  export const deleteCommentAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMENTS_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
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


  export const updateCommentAction = (id, comment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMENTS_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("userInfo")
        },
      };
      const data =
      { comment: comment }

    await axios.put(`http://localhost:3000/api/comments/${id}`, data, config);
  
      dispatch({
        type: COMMENTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENTS_UPDATE_FAIL,
        payload: message,
      });
    }
  };