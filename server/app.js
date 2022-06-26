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
/*
 const corsOptions = {
  origin: ["http://localhost:3001"],
  credentials: true,
  'Access-Control-Allow-Credentials': 'true',
  'allowedCredentials': 'true',
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  'preflightContinue': true
}
*/

 app.use(cors({
  credentials: true,
  origin: "http://localhost:3001",
})
);
 
//app.use(express.urlencoded({ extended: true }));

 const db = require("./models");

 //connexion à mysql sequelize 
 
 db.sequelize.sync().then(() => {
    // app.listen(3000, () => {
       console.log("Database connected !");
 });


 
 /*
 //utilisation de cookie-session pour sécuriser les cookies de session 
 const cookieSession = require('cookie-session');
 
 app.use(cookieSession({
   name: 'session',
   keys: [0],
   // Cookie Options
   maxAge: 24 * 60 * 60 * 1000, // 24 hours
   secure: true,
   httpOnly: true
 
 }));
 */

 
 app.use((req, res, next) => {
  //res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
});

 //utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
 //require('dotenv').config()
 //console.log(process.env)
 
 //pour analyser le corps de la requête 
 app.use(express.json());
 

 //permet de se servir du dossier images lors d'une requête 
 app.use('/images', express.static(path.join(__dirname, 'images'))); 
 
 //enregistrer les routes du fichier user.js, routes liées à l'authentification attendues par le frontend


const { errorHandler, notFound } = require("./middlewares/error");


const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const likesRoutes = require("./routes/Likes")
const commentRoutes = require("./routes/Comments")


app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/comments", commentRoutes)


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);


 module.exports = app; 