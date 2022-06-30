

const models = require("../models");

//importation du package bcrypt 
const bcrypt = require('bcrypt');

//importation du package jsonwebtoken 
const jwt = require('jsonwebtoken'); 

const db = require('../models')
const Users = db.Users; 



exports.signup = (req, res,next) => {
    db.Users.findOne({where: {email:req.body.email}}).then(result => {
        if (result) {
            res.status(409).json({
                message:"Email already exists !",
            });
        }else{
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        db.Users.create({
          email: req.body.email,
          password: hash,
        
        })
          .then(() => res.status(201).json({ message: "User created !" }))
  
          .catch((error) => res.status(400).json({ error }));
      })
    }
})
  
      .catch((error) => res.status(500).json({ error }));
};



exports.login = (req, res, next) => {
    Users.findOne({ 
    where: {
        email: req.body.email 
      },
    })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !',
            });
            }
            res.status(200).json({
                
              id: user.id,
              email: req.body.email,
              admin: user.admin,

           
              token: jwt.sign(
                  {id:user.id, email: req.body.email, admin:user.admin},
                  'RANDOM_TOKEN_SECRET',
                  {expiresIn: '24h'}
              )
            });
          })
          .catch((error) => {
            console.log(error)
            return res.status(403).json({error})
         
        })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({error})
      })
      })
  };



//get by id
exports.getOneUser = (req,res, next) => {
    Users.findByPk(req.params.id, {
      attributes : [
        "id",
        "email",
        "username",
        "firstName",
        "lastName",   
        "bio",
        "admin"
      ]
    }
    )
    .then((result) => {
        res.status(200).send(result)
    });
}; 


//get all users 

exports.getAllUsers = (req, res,next) => {
    models.Users.findAll({
      attributes: [
        // data in mysql
        "id",
        "email",
        "username",
        "firstName",
        "lastName",   
        "bio",
        "admin",
      ],
    })
      .then((users) => res.status(200).json(users))
  
      .catch((error) => res.status(500).json({ error }));
  };

