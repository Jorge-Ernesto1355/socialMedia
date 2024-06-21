const ConversationService = require("../../ConversationService");

const getConversationId = async (req, res) => {
  const { userId, friendId } = req.params;

  if(!userId || !friendId) return res.status(500).json({error: "arguments insuficients"})

  const conversation = await ConversationService.getConversationId({
    userId, friendId,
  });

  if (conversation?.error) {
    return res.status(500).json({ error: conversation?.message });
  }

  return res.status(201).json(conversation);
};

module.exports = getConversationId;
