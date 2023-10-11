const ReactionService = require("../ReactionService");

const getReactionsView = async (req, res) => {
  const { containerId, type } = req.params;

  const reactionsView = await ReactionService.view({
    containerId,
    type,
  });

  if (reactionsView?.error) {
    return res.status(500).json(reactionsView);
  }

  return res.status(200).json(reactionsView);
};

module.exports = getReactionsView;
