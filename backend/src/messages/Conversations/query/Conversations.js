const ConversationService = require("../../ConversationService");

const getConversations = async (req, res) => {
  const conversations = await ConversationService.conversations({});

  if (conversations?.error) {
    return res.status(500).json({ error: conversations?.message });
  }

  return res.status(200).json(conversations);
};

module.exports = getConversations;
