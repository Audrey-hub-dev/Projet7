
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import UpdatePost from "./pages/UpdatePost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostComments from "./pages/PostComments";
import PageNotFound from "./pages/PageNotFound";
import UpdateComment from "./pages/UpdateComment"; 


function App() {




  return (
    <Router>
    
      <main className="App">
        <Route exact path="/" component={Home}/>
        <Route path="/Register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/note/:id" component={UpdatePost} />
        <Route path="/createnote" component={CreatePost} />
        <Route path="/postcomments/:id" component={PostComments}/>
        <Route path="/updatecomment/:id" component={UpdateComment} />
        <Route path="*" exact component={PageNotFound} />
     
      </main>
      <Footer />
    </Router>
  )
}

export default App;