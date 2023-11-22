const ConversationService = require("../../ConversationService");

const BlockContact = async (req, res) => {
  const { conversationId } = req.params;

  const block = await ConversationService.blockContact({ conversationId });

  if (block?.error) return res.status(500).json({ error: block?.message });

  return res.status(200).json({ message: "Blocked Contact" });
};

module.exports = BlockContact;
