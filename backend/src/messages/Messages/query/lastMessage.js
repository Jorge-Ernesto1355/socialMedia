const ConversationService = require("../../ConversationService");

const lastMessage = async (req, res) => {
  const { conversationId } = req.params;

  const lastMessage = await ConversationService.lastMessage({
    conversationId,
  });

  if (lastMessage?.error) {
    return res.status(500).json({ error: lastMessage?.message });
  }

  return res.status(201).json(lastMessage);
};

module.exports = lastMessage;
