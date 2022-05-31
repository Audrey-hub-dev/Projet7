

const express = require('express');
const router = express.Router(); 


const commentCtrl = require('../controllers/comment'); 

//Create a new comment
router.post('/addComment', commentCtrl.addComment)
//Retrieve all comments
router.get('/getAllComments', commentCtrl.getAllComments)
//Retrieve one comment with id 
router.get('/:id', commentCtrl.getOneComment)
//Update one comment with id
router.put('/:id', commentCtrl.updateComment)
//Delete one comment with id
router.delete('/:id', commentCtrl.deleteComment)


module.exports = router; 