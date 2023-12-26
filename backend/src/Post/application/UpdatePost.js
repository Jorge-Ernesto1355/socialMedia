const PostService = require("../PostService");

const Update = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.query;
  const { description } = req.body;

  const updatedPost = await PostService.update({ postId, description, userId });

  if (updatedPost?.error)
    return res.status(500).json({ error: updatedPost?.message });

  return res.status(201).json({ message: "post updated" });
};

module.exports = Update;
