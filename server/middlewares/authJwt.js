
//utilisation du package jwt pour vérifier les token
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');


//exportation du middleware d'authentification 
module.exports  = (req, res, next) => {
  try {
    //récupération du token dans le header, dans network, headers, 
    //authorization, la chaine de caractères est le token
    /*deuxième élément de ce tableau qui est a chaine de caractères*/
   const token = req.headers.authorization.split(' ')[1];
    //décoder le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'/*cette clé
    //doit correspondre à la clé dans la fonction login*/);
    //récupération de l'user id qui est dans le token 
    const userId = decodedToken.id;

    //const admin = decodedToken.admin;
         
    //on ajoute un objet auth à l'objet de requête qui contient le userId extrait du token 
    //pour que seul celui à qui appartient la sauce puisse modifier ou supprimer celle-ci
    //req.auth = {userId}; 

    //req.admin = {admin};


    //s’il y a une différence entre l’userId dans la requête du front-end et l’userId dans le token
    if (req.body.userId && (req.body.userId !== userId)) {
        //ne pas authentifier la requête
      throw 'Invalid user ID';
    } else {// si tout va bien on peut passer la requête au prochain middleware
      //créer, modifier, supprimer une sauce
      //let user =  Users.findByPk(decodedToken.id);
      //res.locals.user = user; 
      next();

     
    }
  } 
  catch (error) {
    res.status(401).json({error: error | 'Requête non authentifiée !'}); 
  }
};




/*
const { jwt } = require('jsonwebtoken');

const db = require('../models')
const Users = db.Users; 

const asyncHandler = require('express-async-handler');

module.exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

      req.user = await Users.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

*/

/*
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'RANDOM_TOKEN_SECRET', async (error, decodedToken) => {
      if (error) {
        res.locals.user = null;
        next();
      } else {
        let user = await Users.findByPk(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'RANDOM_TOKEN_SECRET', async (error, decodedToken) => {
      if (error) {
        console.log(error);
        res.send(200).json("No token");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("No token");
  }
};

*/