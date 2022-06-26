import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  commentDeleteReducer,
  postDeleteReducer,
  postUpdateReducer,
  commentsListReducer,
  updateCommentReducer,
} from "./Reducers/postReducers";
import {
  userLoginReducer,
  userRegisterReducer,
} from "./Reducers/userReducers";

const reducer = combineReducers({

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  commentDelete: commentDeleteReducer,
  postDelete: postDeleteReducer,
  postUpdate: postUpdateReducer,
  commentsList: commentsListReducer,
  updateComment: updateCommentReducer
});

const userInfoFromStorage = sessionStorage.getItem("userInfo")
  ? JSON.stringify(sessionStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;


