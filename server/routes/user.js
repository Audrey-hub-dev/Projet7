
/**
 * Ce fichier gère les routes pour les utilisateurs. 
 */



//utilisation de express pour créer un routeur
const express = require('express');

//utilisation de la fonction router de express
const router = express.Router();

//configuration du router pour associer les fonctions du contrôleur aux différentes routes
const userCtrl = require('../controllers/user');

//const { validateToken } = require("../middlewares/authJwt");
//const { sign } = require("jsonwebtoken");

//const { verifySignUp } = require("../middlewares");
//const { authJwt } = require("../middlewares")

//const passwordVerification = require('../middleware/password-verification');

//création de deux routes post en précisant l'utilisation de la fonction signup et de la fonction login
router.post('/signup', /*passwordVerification,*/ userCtrl.signup);

router.post('/login',  userCtrl.login);

/*
router.get('/auth', validateToken, (req, res) => {
  res.json(req.user);
}); 
*/


module.exports = router;










