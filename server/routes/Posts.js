
const express = require('express');
const router = express.Router(); 
  
  
const postCtrl = require('../controllers/post'); 

  
//Create a new post
router.post('/addPost', postCtrl.addPost)
//Retrieve all posts
router.get('/getAllPosts', postCtrl.getAllPosts)
//Retrieve one post with id 
router.get('/:id', postCtrl.getOnePost)
//Update one post with id
router.put('/:id', postCtrl.updatePost)
//Delete one post with id
router.delete('/:id', postCtrl.deletePost)


module.exports = router;

