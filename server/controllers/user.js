

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



/*
//get role by userId 
exports.role = (req, res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.id
    
    Users.findOne({
        where: { id: userId},
    
      attributes: [
        // data in mysql
        "admin",
      ],
    })
      .then((user) => res.status(200).json(user))
  
      .catch((error) => {
          console.log(error)
            res.status(500).json({ error });
      });
  };

*/


/*
//get one (single) user 
exports.getOneUser = (req, res,next) => {
    let authorId = parseInt(req.params.id);
    Users.findOne({
      where: {id: authorId} //req.params.id,
      },
    )
    //})
      .then((user) => res.status(200).json(user))
  
      .catch((error) => res.status(500).json({ error }));
  };
*/


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


  /*
// put (update) username
exports.updateUsername = async (req, res,next) => {
   await models.Users.findOne({ where: { id: req.params.id } })
        .then(() => {
          models.Users.update(
            {username: req.body.username},
            {
              where: { id: req.params.id },
            }
          )
            .then(() => res.status(200).json({ message: "Username updated successfully !" }))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    };


// put (update) firstname
exports.updateFirstname = async (req, res,next) => {
    await models.Users.findOne({ where: { id: req.params.id } })
         .then(() => {
           models.Users.update(
             {firstname: req.body.firstname},
             {
               where: { id: req.params.id },
             }
           )
             .then(() => res.status(200).json({ message: "Firstname updated successfully !" }))
             .catch((error) => res.status(400).json({ error }));
         })
         .catch((error) => res.status(500).json({ error }));
     };
 


// put (update) lastname
exports.updateLastname = async (req, res,next) => {
    await models.Users.findOne({ where: { id: req.params.id } })
         .then(() => {
           models.Users.update(
             {lastname: req.body.lastname},
             {
               where: { id: req.params.id },
             }
           )
             .then(() => res.status(200).json({ message: "Lastname updated successfully !" }))
             .catch((error) => res.status(400).json({ error }));
         })
         .catch((error) => res.status(500).json({ error }));
     };
 

// put (update) bio
exports.updateBio = async (req, res,next) => {
    await models.Users.findOne({ where: { id: req.params.id } })
         .then(() => {
           models.Users.update(
             {bio: req.body.bio},
             {
               where: { id: req.params.id },
             }
           )
             .then(() => res.status(200).json({ message: "Bio updated successfully !" }))
             .catch((error) => res.status(400).json({ error }));
         })
         .catch((error) => res.status(500).json({ error }));
     };







//delete one user by id
exports.deleteUser = async (req, res,next) => {
    Users.findOne({
        where: {
          id: req.params.id,
        },
      })
        .then(() => {
              Users.destroy({ where: { id: req.params.id } });
              res.status(200).json({ message: "Compte supprimé !" });   
          
        })
    
        .catch((error) => res.status(500).json({ error }));
};
   

*/
/*

const asyncHandler  = require('express-async-handler');
const db = require('../models')
const Users = db.Users; 
const { generateToken } = require('../utils/generateToken');

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await Users.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await Users.create({
    email,
    password,
  
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user._id);

  if (user) {
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});


*/