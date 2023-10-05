const Reaction = require("../../../dominio/Reaction");
const Comment = require("../../../dominio/comments");
const getReactionsComment = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(500).json({ message: "algo salio mal" });
  const { limit, page } = req.query;
  const parsedLimit = parseInt(limit, 10) || 10;
  const parsedPage = parseInt(page, 10) || 1;

  try {
    let reactionsIds = [];
    const comment = await Comment.findById(id)
      .select(["reactions"])
      .populate([
        "comment.reactions.gusta",
        "comment.reactions.encanta",
        "comment.reactions.divierte",
        "comment.reactions.asombra",
        "comment.reactions.entristece",
      ]);
    for (key in comment.reactions) {
      if (typeof comment.reactions[key] === "object") {
        reactionsIds = reactionsIds.concat(comment.reactions[key]);
      }
    }

    const reactions = await Reaction.paginate(
      { _id: { $in: reactionsIds.map((id) => id._id) } },
      { limit: parsedLimit, page: parsedPage }
    );

    return res.status(200).json(reactions);
  } catch (error) {
    res.status(500).json({ message: "algo salio mal" });
  }
};

module.exports = getReactionsComment;
