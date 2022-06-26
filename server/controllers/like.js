
const db = require("../models"); // Récupération des modèles Sequelize
const Likes = db.Likes; 
const jwt = require("jsonwebtoken"); // Jwt necessaire pour la gestion d'un token
const Op = db.Sequelize.Op;

exports.likeSystem = async (req, res, next) => {
/*
  
  try {
    // Nous avons besoin de récupérer l'userId par l'intermédiaire du token, à defaut du store frontend
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.id;

    const userLike = await Likes.findOne({
      // On vérifie si un like est déjà présent
      where: {
        usersLId: userId,
        postsLId: req.body.postsLId
      },
    });

    if (userLike) {
      // Si oui on le supprime de la BDD
      await Likes.destroy(
        {
          where: {
            usersLId: userId,
            postsLId: req.body.postsLId
          },
        },
        //{ truncate: true }
      );
      res.status(200).json({ message: "Like cancelled !" });
    } else {
      // Sinon le rajoute
      Likes.create({
        usersLId: userId,
        postsLId: req.body.postsLId
      });
      res.status(201).json({ messageRetour: "Liked !" });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error });
  }

*/


const token = req.headers.authorization.split(" ")[1];
const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
const usersLId = decodedToken.id;

const { postsLId } = req.body;


const found = await Likes.findOne({
  where: { postsLId: postsLId, usersLId: usersLId },
});
if (!found) {
  await Likes.create({ postsLId: postsLId, usersLId: usersLId });
  res.json({ likedPosts: true });
} else {
  await Likes.destroy({
    where: { postsLId: postsLId, usersLId: usersLId },
  });
  res.json({ likedPosts: false });
}
};



