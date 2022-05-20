const User = require("../../../src/users/domain/UserModel")
const Post = require("../../dominio/Post")
const Comment = require('../../dominio/comments')
const { json } = require("express")


const comments = async (req, res)=>{

  //obteniendo los query y los body 

   const {id, idcomment} = req.query
   const {commentsRespondedBody, comment, commentForResponded} = req.body
   

   const post =  await Post.findById(id).populate('comments')
   if(!post){
     return res.status(404).json({message:"post no encontrado"})
   }

 
   if((commentForResponded && idcomment)){
    
    const comments = await Comment.findById(idcomment)
    comments.commentsResponded = [comments.cocomments.commentsResponded, commentForResponded]
    await comments.save()
    
   }
   
   try {
     const commentGot = await new Comment({commentsRespondedBody, comment})
     post.comments = [...post.comments, commentGot]


     const newPost = await post.save()
     await commentGot.save()

    res.status(201).json(newPost)

   } catch (error) {
     res.status(500).json({message:""})
   }
}

module.exports = comments