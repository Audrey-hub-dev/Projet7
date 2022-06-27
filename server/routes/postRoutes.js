
const express = require('express');
const router = express.Router(); 

const postCtrl = require('../controllers/post'); 

const authJwt = require("../middlewares/authJwt")
const multer = require('../middlewares/multer-config');


//Retrieve all posts
router.get('/', authJwt, postCtrl.getAllPosts)

//Retrieve one post with id 
router.get('/:id', authJwt, postCtrl.getOnePost)

router.get('/:id/comments', postCtrl.getComments)
router.post('/:id/comment', postCtrl.addComment)

//Create a new post
router.post('/', authJwt, multer, postCtrl.createPost) 

//Update one post with id
router.put('/:id', authJwt, multer, postCtrl.updatePost)
//Delete one post with id
router.delete('/:id', authJwt, postCtrl.deletePost)

module.exports = router;

