
/* CODE QUI FONCTIONNE 

const express = require("express");
const app = express();
const connection = require('./database');

app.get('/', function(req,res) {
    let sql = "SELECT * FROM SOCIALMEDIAG.Users";
    connection.query(sql, function(err, results) {
        if (err) throw err;
        res.send(results); 
    })
  
}); 

 
app.listen(3001, function() {
    console.log("Server listening on port 3001");
    connection.connect(function(err){
        if(err) throw err;
        console.log('Database connected !');
    
    })
    
  });

 FIN DU CODE QUI FONCTIONNE */


 /*



const userRoute = require('./routes/User');
app.use('/user', userRoute);
//app.use('/createPost' , userRoute); 


//const postRoute = require("./routes/Post");
//app.use("/post", postRoute);




app.get("/login", (req, res) => {

    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    }else {
        res.send ({ loggedIn: false });
    }
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    //const email = req.body.email;
    const password = req.body.password; 

    db.query(
        "SELECT * FROM Users WHERE username = ?" , 
            username,
        (err, results) => {
            if (err) {
                console.log(err);
                res.send({err:err});
            }
            if (results.length > 0) {
                //bcrypt.compare(password, result[0].password, (error, response) => {
                //}) 

                if (password == results[0].password) {
                    req.session.user = results; 
                    console.log(req.session.user);
                    res.send(results);
                }else {
                    res.send({ message: "Wrong unsername/password !"});
                }
            }else {
                    res.send({
                        loggedIn: false, message: "Username doesn't exist !"})
                }
            }
    )

 

});


 */

const express = require("express");
const app = express();
const cors = require("cors");

const session = require('express-session'); 

const db = require('./config/database'); 




app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
})
); 

app.use(express.json());


app.use(
    session({
        key:"userId",
  secret:["lala"],
        rsave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 *24,

        }
    })
); 


/*
const userRoute = require("./routes/User");
app.use("/user", userRoute);


const postRoute = require("./routes/Post");
app.use("/post", postRoute);
*/

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query(
      "INSERT INTO Users (username, password) VALUES (?, ?);",
      [username, password],
      (err, results) => {
        console.log(err);
        res.send(results);
      }
    );
  });



  app.get("/login", (req, res) => {

    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user});
    }else {
        res.send ({ loggedIn: false });
    }
});





app.post("/login", (req, res) => {
    const username = req.body.username;
    //const email = req.body.email;
    const password = req.body.password; 

    db.query(
        "SELECT * FROM Users WHERE username = ?" , 
            username,
        (err, results) => {
            if (err) {
                console.log(err);
                //res.send({err:err});
            }
            //if (results.length > 0) {
                //bcrypt.compare(password, result[0].password, (error, response) => {
                //}) 
            //
            if (results.length > 0) {
                if (password == results[0].password) {

                        req.session.user = results; 
                        console.log(req.session.user);
                     
                    res.json({loggedIn: true, username: username})
                }else {
                  
                    res.json({loggedIn: false, message:"wrong username/password !"})
                }
            }else {
              
                res.json({loggedIn: false, message:"User doesn't exist !"})

            }
        
        }
    )
    }); 


//pour récupérer tous les posts de tout le monde
app.get("/", (req, res) => {
    db.query("SELECT * FROM Posts", (err, results) => {
        if (err) {
            console.log(err);
          }
          res.send(results);
    });
});
     


app.get("/byUser/:username", (req, res) => {
    const userName = req.params.username;
        db.query(
          "SELECT * FROM Posts WHERE author = ?;",
          userName,
          (err, results) => {
            if (err) {
              console.log(err);
            }
            res.send(results);
        }
    );
});




app.post("/post", (req, res) => {
    const title = req.body.title;
    const description = req.body.description; 
    const imageURL = req.body.imageURL;
    const author = req.body.author;
   
   

    db.query(
        "INSERT INTO Posts (title, description, imageURL, author) VALUES (?, ?, ?, ?) ;" , 
        [title, description, imageURL, author],
        (err, results) => {
          console.log(err);
          res.send(results);
        }
    );
});




app.post("/post/like", (req, res) => {
    const userLike = req.body.userLike;
    const postId = req.body.postId;
      
        db.query(
          "INSERT INTO Likes (userLike, postId) VALUES (?,?)",
          [userLike, postId],
          (err, results) => {
            if (err) {
              console.log(err);
            }
            db.query(
              "UPDATE Posts SET likes = likes + 1 WHERE id = ?",
              postId,
              (err2, results2) => {
                res.send(results);
              }
            );
        }
    );
});



app.listen(3001, (req, res) => {
    console.log("Server listening on port 3001");
    console.log('Database connected !');

});
