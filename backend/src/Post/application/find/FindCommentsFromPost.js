
const Post = require("../../dominio/Post")
const Comment = require("../../dominio/comments")

const FindCommentsFromPost = async  (req,res)=>{


  
 const {id} = req.params
 if(!id) return res.status(500).json({message:'algo salio mal'})


   try {
   const post = await Post.findById(id).select(['comments']).populate('comments')
   const comments = await Comment.paginate({_id:{$in: post.comments?.map((comment)=>comment._id )}})
  return res.status(200).json(comments)
 } catch (error) {   
res.status(500).json({message:'algo salio mal'})
  }

  
  

}
module.exports = FindCommentsFromPost