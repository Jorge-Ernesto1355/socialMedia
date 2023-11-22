const ConversationService = require("../../ConversationService");

const getConversation = async (req, res) => {
  const { conversationId } = req.params;

  const conversation = await ConversationService.getConversation({
    conversationId,
  });

  if (conversation?.error) {
    return res.status(500).json({ error: conversation?.message });
  }

  return res.status(201).json(conversation);
};

module.exports = getConversation;
