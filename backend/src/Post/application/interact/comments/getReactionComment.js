const Reaction = require("../../../dominio/Reaction")
const Comment = require("../../../dominio/comments")
const getReactionComment = async (req, res)=>{

  const {id} = req.params
  const {label, limit, page} = req.query
  
  if(!id && !label) return res.status(500).json({message:'algo salio mal'})
  
  const parsedLimit = parseInt(limit, 10) || 10
  const parsedPage = parseInt(page, 10) || 1

  try {
    const comment = await Comment.findById(id)
    if(!comment){
      return res.status(500).json({message:'algo salio mal'})
    }
    
    const reactions = await Reaction.paginate({_id: {$in: comment.comment.reactions[label]}}, {limit: parsedLimit, page: parsedPage})

    return res.status(200).json(reactions)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
  
}
  
  module.exports  = getReactionComment