
const Comment = require('../../../dominio/comments')

const getAllCommentsResponded = async (req, res)=>{

  const allCommentsResponded = await Comment.findById(req.params.id).select(['commentsResponded'])

  res.status(200).json(allCommentsResponded)

}


module.exports = getAllCommentsResponded