const Post = require("../../dominio/Post");
const Reaction = require("../../dominio/Reaction");

const FindAllReactionsPost = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(500).json({ message: "algo salio mal" });
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  try {
    let reactionsIds = [];
    const fieldsReaction = await Post.findById(id)
      .select(["reactions"])
      .populate([
        "reactions.gusta",
        "reactions.encanta",
        "reactions.divierte",
        "reactions.asombra",
        "reactions.entristece",
      ]);
    for (key in fieldsReaction.reactions) {
      if (typeof fieldsReaction.reactions[key] === "object") {
        reactionsIds = reactionsIds.concat(fieldsReaction.reactions[key]);
      }
    }

    const reactions = await Reaction.paginate(
      { _id: { $in: reactionsIds.map((id) => id._id) } },
      { limit, page }
    );

    return res.status(200).json(reactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = FindAllReactionsPost;
