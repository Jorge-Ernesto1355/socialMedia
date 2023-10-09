const { validateReaction } = require("../ReactionSchema");
const ReactionService = require("../ReactionService");
const labelsValue = require("../utils/labelsValue");

const React = async (req, res) => {

  const {containerId} = req.params;
  const { label, userId, type } = req.body;

  console.log(containerId)

  const result = validateReaction({
    ...req.body,
    value: labelsValue[label],
    containerId,
  });

  if (result.error)
    return res.status(400).json({ error: result.error.message });

  const reaction = await ReactionService.create({
    label,
    value: labelsValue[label],
    userId,
    containerId,
    type,
  });

  if (reaction?.error)
    return res.status(400).json({ error: reaction.error.message });

  return res.status(200).json(reaction);
};

module.exports = React;
