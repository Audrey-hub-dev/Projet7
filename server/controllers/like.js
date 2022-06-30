
const db = require("../models"); // Récupération des modèles Sequelize
const Likes = db.Likes; 
const jwt = require("jsonwebtoken"); // Jwt necessaire pour la gestion d'un token

exports.likeSystem = async (req, res, next) => {

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



