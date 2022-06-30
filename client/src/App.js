
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import UpdatePost from "./pages/UpdatePost/UpdatePost";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import PostComments from "./pages/PostComments/PostComments";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import UpdateComment from "./pages/UpdateComment/UpdateComment"; 
import Header from "./components/Header";
import GlobalStyle from './utils/style/GlobalStyle';

function App() {




  return (
    <Router>

      <GlobalStyle />
      <Header />
      <Switch>
  
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/Register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/post/:id" component={UpdatePost} />
        <Route path="/createpost">
          <CreatePost />
        </Route>
        <Route path="/postcomments/:id" component={PostComments}/>
        <Route path="/updatecomment/:id" component={UpdateComment} />
        <Route component={PageNotFound} />
     
   
      </Switch>
    </Router>
  )
}

export default App;