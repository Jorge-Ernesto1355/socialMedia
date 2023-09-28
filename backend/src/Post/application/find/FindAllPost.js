const Post = require("../../dominio/Post");

const FindAllPost = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;

  try {
    const posts = await Post.paginate({}, { limit, page });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "algo salio mal " });
  }
};

module.exports = FindAllPost;
