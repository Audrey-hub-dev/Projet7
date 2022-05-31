/**
 * Ce fichier est l'application utilisant Express, il permet de donner suite aux requêtes envoyées 
 * par le frontend. 
 */


 const express = require('express');

 const app = express();
 
 const cors = require("cors");

 app.use(cors({
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
); 
    

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
 
 //importation de path pour utiliser le dossier images
const path = require('path');
 
 
 //utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
 //require('dotenv').config()
 //console.log(process.env)
 
 //pour analyser le corps de la requête 
 app.use(express.json());
 
 //permet de se servir du dossier images lors d'une requête 
 //app.use('/images', express.static(path.join(__dirname, 'images'))); 
 
 //enregistrer les routes du fichier user.js, routes liées à l'authentification attendues par le frontend
 //app.use('/api/auth', usersRoutes); 


const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");
const userRoutes = require("./routes/user");
const likesRoutes = require("./routes/likes");
const profileRoutes = require("./routes/profile");

app.use('/user', userRoutes);
app.use('/posts', postsRoutes); 
app.use('/profile', profileRoutes);
app.use('/comments', commentsRoutes); 
app.use('/likes', likesRoutes)



 
 module.exports = app; 