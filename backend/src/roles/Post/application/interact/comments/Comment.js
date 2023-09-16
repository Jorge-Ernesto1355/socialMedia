
const Post = require("../../../dominio/Post")
const Comment = require('../../../dominio/comments')
const User = require("../../../../users/domain/UserModel")
const createImagen = require('../../createPost/createImagen')



const comments = async (req, res)=>{

  //obteniendo los query y los body 
    let post = {}
   const {postId, commentId} = req.query
   const { text, userId, image} = req.body
   
   console.log(req.body)
    if(postId === undefined ){
      return res.status(500).json({message:"algo salio mal "})
    } else{

       post = await Post.findById(postId).populate('comments')
    }

   if(!post){
     return res.status(404).json({message:"post no encontrado"})
   }

 
   if(((userId && text ) && commentId)){
  
    const comments = await Comment.findById(commentId)
  let image = null
    if (req.files?.image) {
     image = await createImagen(req)
    }
    comments.commentsResponded = [...comments.commentsResponded, {userId, text, image}]
  
    await comments.save()
  

    return res.status(202).json({message:'se ha respondido'})
   }
   
   try {

    const user = await User.findById(userId)
    if(!user){
      return res.status(500).json({message:"user no encontrado"})
    }
    let image = null
    if (req.files?.image) {
     image = await createImagen(req)
    }
   
     const commentGot = await new Comment({ comment:{userId, text, image}})
     post.comments = [...post.comments, commentGot]


     await post.save()
     await commentGot.save()

     

    return res.status(201).json({message:'se ha creado un comment'})

   } catch (error) {
     console.log(error)
   return   res.status(500).json({message:"algo salio mal commentpa"})
   }
}

module.exports = comments