const validateObjectId = require("../../libs/isValidObjectId");
const exits = require("../../libs/exits");
const Comment = require("../domain/comments");
const createImagen = require("../../Post/application/createPost/createImagen");
const getTotalPoints = require("../../reaction/utils/getTotalPoints");


class CommentService {
  static async getAll(object) {
    try {
      exits(object);

      const { containerId, type, limit, page } = object;

      const queryOptions = {
        model:type, 
        select:['comments']
      }

      const options = {
        limit,
        page,
        sort: { createdAt: 'desc' },
      };
      const container = await validateObjectId({ _id: containerId }, queryOptions);

      if (container?.error) {
        throw new Error(validateContainer?.error?.message);
      }

      const commentsIds = container.comments.map((commentId) => commentId);

      const comments = await Comment.paginate(
        { _id: { $in: commentsIds } },
        options
      );
      return comments;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async mostView(object){
    try {
      exits(object)

      const {containerId, type, limit, page} = object

      const comments = await this.getAll({containerId, limit, page, type})

      if(comments.error){
        throw new Error("something went wrong")
      }

      const commentsId = comments?.docs?.map((commentId) => commentId)

      const commentsPaginate = await Comment.paginate({_id:{$in:commentsId}})

      const commentWithTotalPoints = await Promise.all(commentsPaginate?.docs?.map(async (currentComment) => {
        const totalPoints = await getTotalPoints(currentComment?.reactions);
   
      
        if (totalPoints?.error) {
          throw new Error(totalPoints?.message);
        }
      
        if (typeof totalPoints === 'number') {
          currentComment.comment.points = totalPoints;
        }
      
        return currentComment;
      }));

      const orderedPosts =  commentWithTotalPoints.sort((a, b) =>   b?.points - a?.points)

      commentsPaginate.docs = orderedPosts

      return commentsPaginate
    } catch (error) {
      return {
        error, 
        message: error.message
      }
      
    }
  }

  static async getResponded(object) {
    try {
      exits(object);

      const { commentId, limit, page } = object;

      const queryOptions = {
        model:"Comment", 
        select:['commentsResponded']
      }
      const comment = await validateObjectId({_id:commentId}, queryOptions);

      if (comment?.error) {
        throw new Error(validateComment?.message);
      }
  
      const commentsId = comment?.commentsResponded?.map((commentId)=> commentId)
        
      const commentsResponded = await Comment.paginate({_id:{$in : commentsId}}, {page, limit})

      return commentsResponded;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async create(object) {
    try {
      exits(object);
      const { containerId, userId, text, type, commentId } = object;
      console.log(commentId)

      
      const optionsUser = {
        model:'User', 
        select:['username']
      }
      const optionsContainer = {
        model:type, 
        select:['comments']
      }

 

      const user = await validateObjectId({ _id: userId }, optionsUser);
    
      if( commentId === 'undefined' ){
        
        const container = await validateObjectId({ _id:containerId }, optionsContainer);
        
        if (container?.error || user?.error) {
          throw new Error("document not found or objectsfdsfsId is not valid");
        }
        
        const image = await createImagen(object.files);
        const commentCreated = await this.createComment({...object, image})
        
        if (container.comments)
          container.comments = [...container.comments, commentCreated];
  
        await container.save();
        await commentCreated.save()
        return commentCreated;
        
      }
    

      if (userId && text &&  commentId !== 'undefined' ) {
        const image = await createImagen(object.files);
        const commentCreated = await this.createComment({...object, image, containerId:commentId})
        const commentGot = await validateObjectId({_id: commentId}, {model:'Comment', select:['commentsResponded']})
        
        if(!Array.isArray(commentGot.commentsResponded)) throw new Error('something went wrong')
       
        commentGot.commentsResponded = [
          ...commentGot.commentsResponded,
          commentCreated,
        ];
        await commentGot.save();
        await commentCreated.save()
        return commentCreated
      }

      return {}

    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
  static async createComment(object){


    try {
      exits(object)
      const { containerId, userId, text, image} = object;
      
      const comment = await new Comment({
        comment: { userId, text, image, containerId },
      });

      return comment
      
    } catch (error) {
      return {
        error, 
        message:error.message
      }
    }
  }

  static async delete(object) {
    try {
      exits(object);

      const { commentId } = object;
      const comment = await validateObjectId({_id: commentId}, {model:'Comment'})

      if (comment?.error) {
        throw new Error(comment.error?.message);
      }

      await Comment.findByIdAndDelete(commentId)
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async update(object) {
    try {
      exits(object);

      const { commentId, text } = object;
      const comment = await validateObjectId({_id: commentId}, {model:'Comment'})

      if (comment?.error) {
        throw new Error(comment?.error?.message);
      }


      comment.comment.text = text;
      comment.edit = true;
      await comment.save();
      return comment;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

}

module.exports = CommentService;
