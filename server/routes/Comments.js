
const express = require('express');
const router = express.Router(); 

const commentCtrl = require('../controllers/comment'); 
const authJwt = require('../middlewares/authJwt');


//Create a new comment
router.post('/', authJwt, commentCtrl.addComment)


//Delete one comment with id
router.delete('/:id', authJwt, commentCtrl.deleteComment)

router.put('/:id', authJwt, commentCtrl.updateComment)

router.get('/:id', authJwt, commentCtrl.getOneComment)


module.exports = router; 