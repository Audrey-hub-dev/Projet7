/**
 * Ce fichier est l'application utilisant Express, il permet de donner suite aux requêtes envoyées 
 * par le frontend. 
 */

 const express = require('express');

 const app = express();

 const fs = require("fs");

//importation de path pour utiliser le dossier images
const path = require('path');
 
const cors = require("cors");

 app.use(cors({
  credentials: true,
  origin: "http://localhost:3001",
})
);
 

 const db = require("./models");

 //connexion à mysql sequelize 
 
 db.sequelize.sync().then(() => {
    // app.listen(3000, () => {
       console.log("Database connected !");
 });

 app.use((req, res, next) => {
  //res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
});
 
 //pour analyser le corps de la requête 
 app.use(express.json());
 
 //permet de se servir du dossier images lors d'une requête 
 app.use('/images', express.static(path.join(__dirname, 'images'))); 
 
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const likesRoutes = require("./routes/Likes")
const commentRoutes = require("./routes/Comments")

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/comments", commentRoutes)


 module.exports = app; 