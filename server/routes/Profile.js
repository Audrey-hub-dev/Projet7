
const express = require('express');
const router = express.Router(); 


const profileCtrl = require('../controllers/profile'); 


// Create a new profile
router.post("/addProfile", profileCtrl.addProfile);
// Retrieve all profiles
router.get("/getAllProfiles", profileCtrl.getAllProfiles);
// Retrieve a single profile with id
router.get("/:id", profileCtrl.getOneProfile);
// Update a profile with id
router.put("/:id", profileCtrl.updateProfile);
// Delete a profile with id
router.delete("/:id", profileCtrl.deleteProfile);



module.exports = router; 

  
