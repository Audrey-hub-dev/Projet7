
const db = require('../models')
const Profiles = db.Profiles; 


//create a profile
const addProfile = async (req, res) => {
    const info = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        job: req.body.job,
        bio: req.body.bio,
        UserId: req.body.UserId
    }
    const profiles = await Profiles.create(info)
    res.status(200).send(profiles)
}

//get all profiles
const getAllProfiles = async (req, res) => {
    const allProfiles = await Profiles.findAll({//attributes : ['lastname']
    })
    res.status(200).send(allProfiles)
}

//get one (single) profile
const getOneProfile = async (req, res) => {
    const id = req.params.id
    const oneProfile = await Profiles.findOne({
        where: {id: id}
    })
    res.status(200).send(oneProfile)
}

// put (update) profile
const updateProfile = async (req, res) => {
    const id = req.params.id
    const profile = await Profiles.update(req.body, { where: { id: id}})
    res.status(200).send(profile)
}

//delete a profile by id
const deleteProfile = async (req, res) => {
    const id = req.params.id
    await Profiles.destroy({where: { id: id }})
    res.status(200).send('Profile is deleted !')

   
}

module.exports = {
    addProfile,
    getAllProfiles,
    getOneProfile,
    updateProfile, 
    deleteProfile
}

