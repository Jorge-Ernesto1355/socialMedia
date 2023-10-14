const { validateComment } = require("../CommentSchema");
const CommentService = require("../CommentService");

const comments = async (req, res) => {
  const { containerId, type } = req.params;
  const { commentId } = req.query;
  const { userId, text } = req.body;

  const result = validateComment({ userId, text, containerId });

  if (result.error) {
    return res.status(400).json({ error: result.error.message });
  }

  const newComment = await CommentService.create({
    containerId,
    commentId,
    type,
    userId,
    text,
  });

  if (newComment.error) {
    return res.status(500).json({ message: newComment.error.message });
  }

  return res.status(201).json(newComment);
};

module.exports = comments;
