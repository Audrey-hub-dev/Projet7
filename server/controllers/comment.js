
const db = require('../models');
const Comments = db.Comments; 
const Posts = db.Posts;


exports.addComment = async (req,res,next) => {


    await Posts.findByPk(req.params.id)
            .then(() => {
                Comments.create({
                 
                    usersId: req.body.usersId,
                    postsId: req.body.postsId,
                    comment: req.body.comment
                });
                return res.status(201).json({message: 'Comment created!'});
            })
            .catch((error) => {
                console.log(error);
                return res.status(500).json({error: error});
            })
        .catch((error) => {
            console.log("Error!");
            console.log(error);
            return res.status(500).json({error: error});
       })  
};



//delete a comment by id
exports.deleteComment = async (req, res,next) => {
    Comments.findOne({
        where: {
          id: req.params.id,
        },
      });
      Comments.destroy(
        {
          where: {
            id: req.params.id,
          },
        },
        //{ truncate: true }
      )
        .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    
        .catch((error) => res.status(400).json({ error }));
  };


exports.updateComment = async (req, res) => {
    await Comments.findOne({
      where: { id: req.params.id },
    })
      .then((comment) => {
        Comments.update(
          {
            comment: req.body.comment,
          },
          {
            where: {
              id: req.params.id
            },
          }
        )
          .then(() => res.status(200).send({ message: "Comment updated" }))
          .catch((error) => res.status(400).send({ message: "Error: " + error }));
      })
      .catch((error) =>
        res.status(500).send({ message: "Comment not found - Error: " + error })
      );
  };


exports.getOneComment = async (req, res ) => {
    await Comments.findOne({
        where: {
          id: req.params.id,
        },
        
        include: [
          {model: db.Posts}
         
        ]
      
    })
      .then((comment) => res.status(200).json(comment))
  
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ error });
      }
      )
};
  
