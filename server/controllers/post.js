
const db = require('../models')
const Posts = db.Posts; 


//create a post
const addPost = async (req, res) => {
    const info = {
        title: req.body.title,
        postText: req.body.postText,
        UserId: req.body.UserId
    }
    const posts = await Posts.create(info)
    res.status(200).send(posts)
}

//get all posts
const getAllPosts = async (req, res) => {
    const allPosts = await Posts.findAll({attributes : ['title']
    })
    res.status(200).send(allPosts)
}

//get one (single) post 
const getOnePost = async (req, res) => {
    const id = req.params.id
    const onePost = await Posts.findOne({
        where: {id: id}
    })
    res.status(200).send(onePost)
}

// put (update) post
const updatePost = async (req, res) => {
    const id = req.params.id
    const post = await Posts.update(req.body, { where: { id: id}})
    res.status(200).send(post)
}

//delete a post by id
const deletePost = async (req, res) => {
    const id = req.params.id
    await Posts.destroy({where: { id: id }})
    res.status(200).send('Post is deleted !')

   
}

module.exports = {
    addPost,
    getAllPosts,
    getOnePost,
    updatePost, 
    deletePost
}





   