const { validateReaction } = require("../actions/ReactionSchema");
const ReactionService = require("../actions/ReactionService");

const GiveLike = async (req, res) => {
  const { label, userId, type } = req.body;
  const { commentId } = req.params;

  //id es el comment al que se le da una accion
  //userId es para meter en el action

  if (!commentId)
    return res.status(400).json({ message: "something went wrong" });

  const result = validateReaction({
    ...req.body,
    value: labelsValue[label],
    containerId: commentId,
  });

  if (result.error)
    return res.status(400).json({ error: result.error.message });

  const reaction = await ReactionService.create({
    label,
    value: labelsValue[label],
    userId,
    containerId: commentId,
    type,
  });

  if (reaction?.error)
    return res.status(400).json({ error: reaction.error.message });

  return res.status(200).json(reaction);
};

module.exports = GiveLike;
