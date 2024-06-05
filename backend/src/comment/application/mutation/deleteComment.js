
const CommentService = require("../CommentService")



const DeleteComment = async  (req, res)=>{

  const {commentId} = req.params

  const comment = await CommentService.delete({commentId})

  if(comment?.error){
    return res.status(500).json({message: comment.message})
  }

  return res.status(200).json({message:'comment deleted'})
  
}

module.exports = DeleteComment