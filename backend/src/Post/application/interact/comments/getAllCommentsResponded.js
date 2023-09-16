
const Comment = require('../../../dominio/comments')

const getAllCommentsResponded = async (req, res)=>{
  const {id:commentId} = req.params


  if(!commentId) return res.status(500).json({message:"comment not found"})
  try {

      const comment = await Comment.findById(commentId).select('commentsResponded')
      
    
    const allCommentsResponded = await Comment.paginate({_id:{$in: comment.commentsResponded?.map((commentId)=> commentId)}})
    return res.status(202).json(allCommentsResponded)

  } catch (error) {
    return res.status(500).json({message:"algo salio mal"})
  }

  

}


module.exports = getAllCommentsResponded