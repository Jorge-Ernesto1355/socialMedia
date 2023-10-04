const Reaction = require("../../../../dominio/Reaction");
const { validateReaction } = require("../ReactionSchema");
const ReactionService = require("../ReactionService");

const labelsValue = {
  encanta: 5,
  gusta: 2,
  asombra: 3,
  entristece: 0,
  divierte: 1,
};

const GiveLike = async (req, res) => {
  const { postId } = req.params;
  const { label, userId, type } = req.body;

  if (!postId) return res.status(500).json({ message: "something went wrong" });

  const result = validateReaction({
    ...req.body,
    value: labelsValue[label],
    containerId: postId,
  });

  if (result.error)
    return res.status(400).json({ error: result.error.message });

  if (!labelsValue.hasOwnProperty(label)) return;

  const reaction = await ReactionService.create({
    label,
    value: labelsValue[label],
    userId,
    containerId: postId,
    type,
  });

  if (reaction?.error)
    return res.status(400).json({ error: reaction.error.message });

  return res.status(200).json(reaction);
};

module.exports = GiveLike;
