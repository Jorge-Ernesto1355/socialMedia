const { validateReaction } = require("../ReactionSchema");
const ReactionService = require("../ReactionService");
const labelsValue = require("../utils/labelsValue");

const ReactionPost = async (req, res) => {
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

module.exports = ReactionPost;
