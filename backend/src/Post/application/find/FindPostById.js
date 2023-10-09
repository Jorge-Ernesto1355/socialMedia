const Post = require("../../dominio/Post");

const findPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "algo salio mal" });
  }
};

module.exports = findPostById;
