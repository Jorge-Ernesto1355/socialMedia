
const Comment = require("../../../dominio/comments")
const Post = require("../../../dominio/Post")

const DeleteComment = async  (req, res)=>{

  const {id} = req.params
  const {postId} = req.query
  
  try {
  
    const post = await Post.findById(postId)

    if(!post.comments.includes(id)){
      return res.status(500).json({message:'no hay ningun comentario con ese id'})
    }
     post.comments.splice(post.comments.indexOf(id), 1)
   
    await post.save()
   
    return res.status(202).json(post)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:'algo malo salio'})
  }


}

module.exports = DeleteComment