const UserModel = require("../../../../users/domain/UserModel");
const Post = require("../../../dominio/Post");
const Comment = require("../../../dominio/comments")
const mongoose = require('mongoose');
const createImagen = require("../../createPost/createImagen");
function exits(object) {
    if (!object) throw new Error("not found parameters");
  }

  async function validateObjectId(id, model) {
   console.log('ejecutando')
 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        // Si el ObjectId no es válido
        console.log('no es valid')
        throw new Error('objectId is not valid')
    }

    try {
        const document = await model.findById(id);
       
        if(!document ) throw new Error('document not found')
    } catch (error) {
        // Si ocurre un error al buscar en la base de datos
       return {
        error, 
        message: error.message
       } // Puedes manejar el error según tus necesidades
    }
}

class CommentService {

    static async getAll(){

    }

    static async create(req){
        
        exits(req)
        const {text, userId} = req.body
        const {commentId} = req.query
        const {postId} = req.params
        
        try {


       const isValidUser =  await validateObjectId(userId, UserModel)
       const isValidPost = await validateObjectId(postId, Post)

       if(isValidPost?.error || isValidUser?.error){
        throw new Error('document not found or objectId is not valid')
       }



        const image = await createImagen(req)
        const comment = await new Comment({ comment:{userId, text, image, postId}})
        const commentCreated = await comment.save()
 
        if((userId && text && commentId)){
         const commentGot = await Comment.findById(commentId)
         commentGot.commentsResponded = [...commentGot.commentsResponded,commentCreated ]
         return await  commentGot.save() 
        }
 
        return commentCreated
        
      } catch (error) {
        return {
            error,
            message: error.message,
          };
      }


    }
}

module.exports = CommentService