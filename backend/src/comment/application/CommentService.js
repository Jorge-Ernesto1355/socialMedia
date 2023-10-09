

const validateObjectId = require('../../libs/isValidObjectId')
const exits = require('../../libs/exits')
const Comment = require("../domain/comments");
const createImagen = require('../../Post/application/createPost/createImagen');
const { default: mongoose } = require('mongoose');

class CommentService {
  static async getAll(object) {
    try {
      exits(object);
  
      const { containerId, type, limit, page} = object;
  
      const options = {
        limit,
        page,
       
      };
      const validateContainer = await validateObjectId(containerId, type);

      if (validateContainer?.error) {
        throw new Error(validateContainer?.error?.message);
      }

      const container = await mongoose.models[type].findById(containerId)
    

    const commentsIds = container.comments.map((commentId)=> commentId)
      

      const comments = await Comment.paginate({_id:{$in:commentsIds}}, options);
      return comments

    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async getResponded(object){
    try {
      exits(object)
      
      const {commentId ,limit, page} = object
      const validateComment = await validateObjectId(commentId, "Comment");

    if (validateComment?.error) {
      throw new Error(validateComment?.error?.message);
    }

    const comment = await Comment.findById(commentId)

    const commentsResponded = await Comment.paginate({_id:{$in: comment.commentsResponded?.map((commentId)=> commentId)}}, {page, limit})
 
    return commentsResponded

    } catch (error) {
      return {
        error, 
        message:error.message
      }
    }

       
  }

  static async create(object) {
    try {
      exits(object);
      const {containerId, userId, text, type, commentId} = object
      const isValidUser = await validateObjectId(userId, "User");
      const isValidContainer = await validateObjectId(containerId, type);

      if (isValidContainer?.error || isValidUser?.error) {
        throw new Error("document not found or objectId is not valid");
      }

      const container =  await mongoose.models[type].findById(containerId)
     
      const image = await createImagen(object.files);
      const comment = await new Comment({
        comment: { userId, text, image, containerId },
      });
      const commentCreated = await comment.save();

      if (userId && text && commentId) {
        const commentGot = await Comment.findById(commentId);
        commentGot.commentsResponded = [
          ...commentGot.commentsResponded,
          commentCreated,
        ];
        return await commentGot.save();
      }

      if(container.comments) container.comments = [...container.comments, commentCreated]
      
      await container.save()
      return commentCreated;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async delete(object){
    try {
      exits(object)
      
      const {commentId} = object
      const validateComment = await validateObjectId(commentId, "Comment");

    if (validateComment?.error) {
      throw new Error(validateComment?.error?.message);
    }

    await Comment.findByIdAndDelete(commentId)

  }
  catch(error){
   return {
        error,
        message: error.message,
      };
    }
  }

  static async update(object){
    try {
      exits(object)
      
      const {commentId, text} = object
      const validateComment = await validateObjectId(commentId, "Comment");

    if (validateComment?.error) {
      throw new Error(validateContainer?.error?.message);
    }
    const comment = await Comment.findById(commentId)
    
    comment.comment.text = text
    comment.edit = true
    await comment.save()
    return comment
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  
  

}

module.exports = CommentService;
