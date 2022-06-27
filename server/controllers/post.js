
const db = require('../models')
const Posts = db.Posts; 
const Users = db.Users
const Likes = db.Likes
const Comments = db.Comments
const fs = require ('fs'); 

const jwt = require('jsonwebtoken')

/*
//get one post by email
exports.getOnePostEmail = (req, res,next) => {
    const email = req.params.email;
    db.Posts.findOne({
        where: {
        userEmail : email
    }
    })
    .then((postEmail) => res.status(200).json(postEmail))
    .catch((error) => res.status(500).json({ error }));
    
}
*/

//get all posts

exports.getAllPosts = async (req, res,next) => {
  const listOfPosts = await Posts.findAll({ 
    //attributes: [ "id", "title", "content","image", "createdAt","updatedAt", "userId"]
    include: [ { model: Likes, as : "Likes"} ],
    order: [["createdAt", "DESC"]]
  })
  
  const likedPosts = await Likes.findAll({ 
  
    include: [{ model: db.Posts}],
    order: [["createdAt", "DESC"]],
  })
 
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });     
};
   
//retrieve post with id and all comments for post
exports.getComments = async (req, res, next) => {
  await Comments.findAll({
    where: {
      postsId: req.params.id
    },
    attributes: [
      'id',
      'usersId', 
      'postsId',
      'comment', 
      'createdAt',
      'updatedAt'
    ],
      include : [{ model: db.Posts}],
      order: [["createdAt", "DESC"]],

  })
  .then((comments) => res.status(200).json(comments))

  .catch((error) => {
      console.log(error)
      return res.status(500).json({ error });
})
};

// create a comment 
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

//create a post 
exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const UserId = decodedToken.id

    Users.findOne({
        where: { 
            id: UserId
        }, 
          
    })
         .then(() => {
            Posts.create({
                title: req.body.title,
                content: req.body.content,
                
                image : `${req.protocol}://${req.get("host")}/images/${
                   req.file.filename}`,
                
                userId: UserId,
              
            })
                .then(() => res.status(201).json({message: 'post created !'}))
                .catch((error) => {
                    console.log(error)
                    return res.status(403).json({error})
                });
         

         })
        .catch((error) => {
        console.log(error)
        return res.status(400).json({ error })
    })    

}
       

// put (update) post
exports.updatePost = async (req, res,next) => {
    let newImage = "none"
    let post = await Posts.findOne({ where: { id: req.params.id } });
  // Await: findOne doit s'éxécuter avant post.image
  // Si une image est envoyé par l'utilisateur.
  if(req.file && req.file.filename) {
    newImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    // Si il y a une image dans l'article
    if(newImage != 'none' && post.image != 'none') {
        // Suppresion de l'image.
        const filename = post.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
        });
    }
}
else newImage = post.image;

    Posts.findOne({
    where: {
      id: req.params.id,
    },
    })
        .then((post) => {
            Posts.update(
            {
            title: req.body.title,
            content: req.body.content,
            image: newImage, // Si nouvelle image, son chemin est enregistré dans la BDD 
        },
        {
          where: { id: req.params.id },
        }
      )
        .then(() => res.status(200).json({ message: "Post mis à jour !" }))
        .catch((error) => {
            console.log(error)
            res.status(400).json({ error });
        })
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ error })
    });
};

//get one post by id
exports.getOnePost = async (req, res,next) => {
    await Posts.findOne({
        where: {
          id: req.params.id,
        },
        /*
        include: [
            { model: db.Likes, as: "likes"}, {model: db.Comments, as: "comments"}
            //{ model: db.Comments },
        ]
      */
    })
    
      .then((post) => res.status(200).json(post))
  
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ error });
      }
      )
  };
  
  /*
//get all posts by userId 
exports.getPostsUser = async (req, res, next) => {
    const id = req.params.id
    await Posts.findAll({
        where: {userId: id},
        include: [Likes]
    })

    .then((post) => res.status(200).json(post))
  
    .catch((error) => {
        console.log(error)
        return res.status(500).json({ error });
    })
};
*/

//delete a post by id
exports.deletePost = async (req, res,next) => {
    Posts.findOne({
        where: {
          id: req.params.id,
        },
      })
        .then((post) => {  
          if (post.image !== null) {
            // Si image présente on la supprime du répertoire, puis on supprime le post de la BDD
            const filename = post.image.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              
                Posts.destroy(
                { where: { id: post.id } },
                //{ truncate: true, restartIdentity: true }
                );
              res.status(200).json({ message: "Post supprimé !" });
            });
            } else { // Sinon on supprime uniquement le post
            
                Posts.destroy(
              { where: { id: post.id } },
              //{ truncate: true, restartIdentity: true }
            );
            res.status(200).json({ message: "Post supprimé !" });
          }
        })
    
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error })
        });
    };
   






   