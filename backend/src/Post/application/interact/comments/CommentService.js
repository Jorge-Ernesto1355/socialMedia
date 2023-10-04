const UserModel = require("../../../../users/domain/UserModel");
const Post = require("../../../dominio/Post");
const Comment = require("../../../dominio/comments");
const createImagen = require("../../createPost/createImagen");
const validateObjectId = require("../../../../libs/isValidObjectId");
const exits = require("../../../../libs/exits");

class CommentService {
  static async getAll({ req, limit, page }) {
    exits(req);

    const { postId } = req.params;

    const options = {
      limit,
      page,
      sort: { date: -1 },
    };

    try {
      const isValidPost = await validateObjectId(postId, Post);

      if (isValidPost?.error) {
        throw new Error(isValidPost?.error?.message);
      }

      const comments = await Comment.paginate({ postId }, options);
      if (comments) return comments;
      if (!comments) return {};
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async create(req) {
    exits(req);

    const { text, userId } = req.body;
    const { commentId } = req.query;
    const { postId } = req.params;

    try {
      const isValidUser = await validateObjectId(userId, UserModel);
      const isValidPost = await validateObjectId(postId, Post);

      if (isValidPost?.error || isValidUser?.error) {
        throw new Error("document not found or objectId is not valid");
      }

      const image = await createImagen(req);
      const comment = await new Comment({
        comment: { userId, text, image, postId },
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

      return commentCreated;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
}

module.exports = CommentService;
