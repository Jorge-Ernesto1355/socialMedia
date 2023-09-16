const Post = require("../../dominio/Post")
const Reaction = require("../../dominio/Reaction")

const FindReactionPost = async (req, res)=>{

    
    const {id} = req.params
    const {label} = req.query
    const limit = parseInt(req.query.limit, 10) || 10
    const page = parseInt(req.query.page, 10) || 1

    if(!id && !label) return res.status(400).json({message:'Bad request: missing id and label'})

    const post = await Post.findById(id).populate(['reactions.gusta', 'reactions.encanta', 'reactions.divierte', 'reactions.asombra', 'reactions.entristece'])
    if(!post) return res.status(404).json({message:'Post not found'})
   
   
    try {
    
   
    const reactions = await Reaction.paginate({_id: {$in: post.reactions[label]}}, {limit, page})
    
    


  

    return res.status(200).json(reactions)
    } catch (error) {
    
      res.status(500).json({message:error.message})
    }
    
  
  }
  
  module.exports  = FindReactionPost