
const Post = require("../../../dominio/Post")
const Comment = require('../../../dominio/comments')
const User = require("../../../../users/domain/UserModel")
const createImagen = require('../../createPost/createImagen')
const { validateComment } = require("./CommentSchema")
const CommentService = require("./CommentService")




const comments = async (req, res)=>{

  const {postId} = req.params
   if(!postId) return res.status(500).json({message:"something went wrong"})

   
   const result = validateComment({comment:{...req.body, postId}})

   if (result.error) {
     return res.status(400).json({ error: result.error.mesasge });
   }
  
   const newComment = await CommentService.create(req)
  

   if(newComment.error){
    return res.status(400).json({message:newComment.error.message})
   }
    
    return res.status(201).json(newComment)

   
}

module.exports = comments