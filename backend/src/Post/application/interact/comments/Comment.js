
const Post = require("../../../dominio/Post")
const Comment = require('../../../dominio/comments')
const User = require("../../../../users/domain/UserModel")
const createImagen = require('../../createPost/createImagen')




const comments = async (req, res)=>{

   const {commentId} = req.query
   const {id:postId} = req.params
   const { text, userId} = req.body
   console.log({commentId, postId, text, userId})
   
  
    if(!postId) return res.status(500).json({message:"algo salio mal "})
    const post = await Post.findById(postId)

    const user = await User.findById(userId)
    if(!user) return res.status(500).json({message:"user no encontrado"})
      
    
   try {

    let image = null

    if (req.files?.image) {
      image = await createImagen(req)
     }

     //commentGot is the comment that has been got for the id commentId
     //commentCreated is gonna come into in a new post or comment

     const comment = await new Comment({ comment:{userId, text, image}})
     const commentCreated =  await comment.save()

    if((userId && text  && commentId)){
  
      const commentGot = await Comment.findById(commentId)
      commentGot.commentsResponded = [...commentGot.commentsResponded,commentCreated ]
      await commentGot.save()
  
      return res.status(202).json({message:'se ha respondido'})
     }

  
     post.comments = [...post.comments, commentCreated]
     await post.save()
    
    return res.status(201).json({message:'se ha creado un comment'})

   } catch (error) {
     console.log(error)
   return   res.status(500).json({message:"algo salio mal commentpa"})
   }
}

module.exports = comments