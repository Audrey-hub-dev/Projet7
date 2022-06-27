
//utilisation du package jwt pour vérifier les token
const jwt = require('jsonwebtoken');



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

    //s’il y a une différence entre l’userId dans la requête du front-end et l’userId dans le token
    if (req.body.userId && (req.body.userId !== userId)) {
        //ne pas authentifier la requête
      throw 'Invalid user ID';
    } else {// si tout va bien on peut passer la requête au prochain middleware
  
      next();
 
    }
  } 
  catch (error) {
    res.status(401).json({error: error | 'Requête non authentifiée !'}); 
  }
};

