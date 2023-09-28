const Post = require("../../../dominio/Post");

const getVotes = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(500).json({ message: "algo salio mal" });

  try {
    const votes = await Post.findById(id).select(["votes"]).populate("votes");

    return res.status(200).json(votes);
  } catch (error) {
    return res.status(500).json({ message: "algo salio mal" });
  }
};

module.exports = getVotes;
