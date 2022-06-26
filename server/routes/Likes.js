

const express = require('express');
const router = express.Router(); 
const authJwt = require('../middlewares/authJwt');

const likeCtrl = require('../controllers/like'); 


router.post('/', authJwt, likeCtrl.likeSystem)

module.exports = router;

