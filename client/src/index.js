
/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
//import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from './pages/Reducers'
//import thunk from 'redux-thunk';
//import rootReducer from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './pages/Reducers/UserReducer';


//import { editUser } from "./actions/user.actions"



const store = configureStore ({
  reducer: {
    user: userReducer,
  },  
});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store={store}>
 
    <App />
  
  </Provider>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

*/

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import "./bootstrap.min.css";
//import 'bootstrap/dist/css/bootstrap.css';
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
