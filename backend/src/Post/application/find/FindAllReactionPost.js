const ReactionService = require("../interact/actions/ReactionService");

const FindAllReactionsPost = async (req, res) => {
  const { id, type } = req.params;
  if (!id && !type) return res.status(500).json({ message: "algo salio mal" });

  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;

  const reactions = await ReactionService.getAll({
    containerId: id,
    limit,
    page,
    type,
  });

  if (reactions.error)
    return res.status(500).json({ message: reactions.error.message });

  return res.status(200).json(reactions);
};

module.exports = FindAllReactionsPost;
