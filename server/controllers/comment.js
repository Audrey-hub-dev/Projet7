
const db = require('../models')
const Comments = db.Comments; 


//create a comment
const addComment = async (req, res) => {
    const info = {
        UserId: req.body.UserId,
        PostId: req.body.PostId,
        commentBody: req.body.commentBody
    }
    const comments = await Comments.create(info)
    res.status(200).send(comments)
}

//get all comments
const getAllComments = async (req, res) => {
    const allComments = await Comments.findAll({attributes : ['PostId']
    })
    res.status(200).send(allComments)
}

//get one (single) comment
const getOneComment = async (req, res) => {
    const id = req.params.id
    const oneComment = await Comments.findOne({
        where: {id: id}
    })
    res.status(200).send(oneComment)
}

// put (update) comment
const updateComment = async (req, res) => {
    const id = req.params.id
    const comment = await Comments.update(req.body, { where: { id: id}})
    res.status(200).send(comment)
}

//delete a comment by id
const deleteComment = async (req, res) => {
    const id = req.params.id
    await Comments.destroy({where: { id: id }})
    res.status(200).send('Comment is deleted !')

   
}

module.exports = {
    addComment,
    getAllComments,
    getOneComment,
    updateComment, 
    deleteComment
}

