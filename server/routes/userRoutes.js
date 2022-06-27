/**
 * Ce fichier gère les routes pour les utilisateurs. 
 */

//utilisation de express pour créer un routeur
const express = require('express');

//utilisation de la fonction router de express
const router = express.Router();

router.use(express.json())

//configuration du router pour associer les fonctions du contrôleur aux différentes routes
const userCtrl = require('../controllers/user');

//création de deux routes post en précisant l'utilisation de la fonction signup et de la fonction login
router.post('/signup', userCtrl.signup);

router.post('/login',  userCtrl.login);

//Retrieve one user with id 
router.get('/:id', userCtrl.getOneUser)

//Retrieve all users
router.get('/getAllUsers', userCtrl.getAllUsers)


module.exports = router;