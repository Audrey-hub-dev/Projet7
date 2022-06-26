
import {
    POSTS_UPDATE_REQUEST,
    POSTS_UPDATE_SUCCESS,
    POSTS_UPDATE_FAIL,
    COMMENTS_DELETE_FAIL,
    COMMENTS_DELETE_REQUEST,
    COMMENTS_DELETE_SUCCESS,
    POSTS_DELETE_FAIL,
    POSTS_DELETE_REQUEST,
    POSTS_DELETE_SUCCESS,
    COMMENTS_LIST_FAIL,
    COMMENTS_LIST_REQUEST,
    COMMENTS_LIST_SUCCESS,
    COMMENTS_UPDATE_REQUEST,
    COMMENTS_UPDATE_SUCCESS,
    COMMENTS_UPDATE_FAIL,
    UPDATE_COMMENT,

    GET_POSTS,
  
  } from "../constants/postConstants";
  
  export const commentsListReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
      case COMMENTS_LIST_REQUEST:
        return { loading: true };
      case COMMENTS_LIST_SUCCESS:
        return { loading: false, notes: action.payload };
      case COMMENTS_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  
  export const commentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case COMMENTS_DELETE_REQUEST:
        return { loading: true };
      case COMMENTS_DELETE_SUCCESS:
        return { loading: false, success: true };
        case COMMENTS_DELETE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const postDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case POSTS_DELETE_REQUEST:
        return { loading: true };
      case POSTS_DELETE_SUCCESS:
        return { loading: false, success: true };
      case POSTS_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export const postUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case POSTS_UPDATE_REQUEST:
        return { loading: true };
      case POSTS_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case POSTS_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };

   
  export const updateCommentReducer = (state = {}, action) => {
    switch (action.type) {
      case COMMENTS_UPDATE_REQUEST:
        return { loading: true };
      case COMMENTS_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case COMMENTS_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
