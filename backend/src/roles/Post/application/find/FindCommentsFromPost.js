
const Post = require("../../dominio/Post")

const FindCommentsFromPost = async  (req,res)=>{

  

  if(req.params.id === undefined){
    return res.status(404)
  }
 const {id} = req.params

      try {
              const post = await Post.findById(id).select(['comments']).populate('comments')
              
              return res.status(200).json(post)
                  
                 
      } catch (error) {
            
            res.status(500).json({message:'algo salio mal'})
      }

  
  

}
module.exports = FindCommentsFromPost