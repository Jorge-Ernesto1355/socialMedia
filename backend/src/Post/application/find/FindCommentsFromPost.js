const CommentService = require("../interact/comments/CommentService");

const FindCommentsFromPost = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;

  const { postId } = req.params;
  if (!postId) return res.status(500).json({ message: "something went wrong" });

  const comments = await CommentService.getAll({ req, limit, page });

  if (comments.error) {
    return res.status(500).json({ message: comments.error.message });
  }

  return res.status(200).json(comments);
};
module.exports = FindCommentsFromPost;
