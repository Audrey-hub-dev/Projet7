
const db = require('../models')
const Likes = db.Likes; 
const Op = db.Sequelize.Op;

      //create a comment
const likeSystem = async (req, res) => {
    const UserId  = req.body.UserId;
    
    const PostId = req.body.PostId;

    if (!PostId)
    return res
      .status(404)
      .send({ message: "Post cannot be found or has been removed" });
    
    let like = await Likes.findOne({
      where: { [Op.and]: [{ PostId: PostId }, { UserId: UserId  }] },
     });
    
      if (!like) {
      let newLike = await Likes.create({
      UserId: UserId,
      PostId: PostId
       });
       return res.json(newLike);
       } else {
      await like.destroy();
      return res.send({ message: "Like cancelled "});
       }
}



module.exports = { likeSystem }
      














  
    
