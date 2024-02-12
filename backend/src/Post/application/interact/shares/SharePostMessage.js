const PostService = require("../../../PostService");

const sharePostMessage = (req, res) => {
  const { to, text, from } = req.body;
  const { postId } = req.params;

  console.log({ to, text, from, postId });

  const messagePost = PostService.sharePostMessage({ to, from, text, postId });

  if (messagePost.error)
    return res.status(500).json({ error: messagePost?.message });

  return res.status(201).json({ message: "shared post" });
};

module.exports = sharePostMessage;
