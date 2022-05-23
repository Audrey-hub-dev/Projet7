
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom'


/*

import Navbar from './components/Navbar'
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login'
import Post from './pages/Post/Post';
import Profile from './pages/Profile/Profile';



function App() {
  return (
  
    <>

    <Navbar />
    <Router>
    
     
      <Route path="/" exact render={() => <Home /> } />
      <Route path="/signup" exact render={() => <SignUp /> } />
      <Route path="/login" exact render={() => <Login /> } />
      <Route path="/post" exact render={() => <Post /> } />
      <Route path="/profile" exact render={() => <Profile /> } />

     
    </Router>
    </>

   
  )
}

export default App;

*/

import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Post from './pages/Post/Post'
import Navbar from './components/Navbar'






function App() {
  return (
  
    <>

    <Navbar />
    <Router>
    
     
      <Route path="/" exact render={(props) => <Home /> } />
      <Route path="/signup" exact render={(props) => <SignUp /> } />
      <Route path="/login" exact render={(props) => <Login /> } />
      <Route path="/profile" exact render={(props) => <Profile /> } />
      <Route path="/post" exact render={(props) => <Post /> } />
    
   
   

     
    </Router>
    </>

   
  )
}

export default App;
