const { validateGetReaction } = require("../ReactionSchema");
const ReactionService = require("../ReactionService");

const getReaction = async (req, res) => {
  const { label } = req.query;
  const { type, containerId } = req.params;

  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;

  const result = validateGetReaction({ label, type, containerId });

  if (result.error)
    return res.status(400).json({ error: result.error.message });

  const reaction = await ReactionService.get({
    label,
    type,
    containerId,
    limit,
    page,
  });

  if (reaction.error)
    return res.status(400).json({ message: reaction.message });

  return res.status(200).json(reaction);
};

module.exports = getReaction;
