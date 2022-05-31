

const models = require("../models");

//importation du package bcrypt 
const bcrypt = require('bcrypt');

//importation du package jsonwebtoken 
const jwt = require('jsonwebtoken'); 


exports.signup = (req, res) => {
    //empêcher la duplication de l'email
    models.Users.findOne({where: {email:req.body.email}}).then(result => {
        if (result) {
            res.status(409).json({
                message:"Email already exists !",
            });
        }else{
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        email: req.body.email,
                        password: hash
                    }
                    //save User to Database 
                    models.Users.create(user).then(result => {
                        res.status(201).json({
                            message:"User created successfully !",
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "Something went wrong !",
                        });
                    });
                })
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong !"
        });
    });
   
};
        
       


exports.login = (req, res) => {
    models.Users.findOne({where: {email: req.body.email}}).then(user => {
        if(user === null) {
            res.status(401).json({
                message: "Invalid credentials !",
            });
        }else{
            //compare password, hash and function callback
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                //password matches, we create a token 
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, 'secret', { expiresIn:'24h'}, function(err, token) {
                        res.status(200).json({
                            message: "Authentication successful !",
                            token: token
                        });
                    });
                //password doesn't match
                }else{
                    res.status(401).json({
                        message: "Invalid credentials !",
                    })
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong !"
        })
    })

}


/*
//function to retrieve all users in db 
exports.allusers =  {
    const fileUser = await Users.findall({
        attributes: ["user_id"],
    })
    models.Users.findAll({where: {update_at: { [Op.ne]: null,}}}).then(result => {
        res.status(200).send({fileUser})
           
        });

    }

*/