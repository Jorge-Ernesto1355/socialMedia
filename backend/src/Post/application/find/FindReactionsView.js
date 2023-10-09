const Post = require("../../dominio/Post");

const FindReactionPostView = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(500).json({ message: "algo salio mal" });

  let reactions = ["gusta", "encanta", "asombra", "divierte", "entristece"];
  let reactionsView = [];
  try {
    const post = await Post.findById(id)
      .select(["reactions"])
      .populate([
        "reactions.gusta",
        "reactions.encanta",
        "reactions.divierte",
        "reactions.asombra",
        "reactions.entristece",
      ]);

    reactions.forEach((reaction) => {
      if (post.reactions[reaction][0] !== undefined)
        reactionsView.push(post.reactions[reaction][0]);
    });

    return res.status(200).json(reactionsView);
  } catch (error) {
    return res.status(500).json({ message: "algo salio mal" });
  }
};

module.exports = FindReactionPostView;
