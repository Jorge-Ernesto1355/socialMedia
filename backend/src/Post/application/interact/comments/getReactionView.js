const Comment = require("../../../dominio/comments")


const getReactionCommentView = async (req, res,)=>{

    const {id} = req.params
    if(!id) return res.status(500).json({message:'algo salio mal'})

    let reactions = ['gusta', 'encanta','asombra', 'divierte', 'entristece']
    let reactionsView = []
    try {
        const comment = await Comment.findById(id).select(['reactions']).populate(['comment.reactions.gusta', 'comment.reactions.encanta', 'comment.reactions.divierte', 'comment.reactions.asombra', 'comment.reactions.entristece'])
    
        reactions.forEach((reaction)=>{
            if(comment.comment.reactions[reaction][0] !== undefined) reactionsView.push(comment.comment.reactions[reaction][0])

        })
        
       return res.status(200).json(reactionsView)
        
    } catch (error) {
        return res.status(500).json({message:'algo salio mal'})
    }
    
  
  }
  
  module.exports = getReactionCommentView