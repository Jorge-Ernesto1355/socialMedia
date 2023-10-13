const ConversationService = require("../../ConversationService");

const Conversation = async (req, res) => {
  const result = validateConversation();

  if (result.error) {
    return res.status(400).json({ error: result.error.message });
  }

  const conversation = await ConversationService.conversation({});

  if (conversation?.error) {
    return res.status(500).json({ error: conversation?.message });
  }

  return res.status(201).json(conversation);
};
module.exports = Conversation;
