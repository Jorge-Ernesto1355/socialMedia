const MessageService = require("../../MessageService");

const Messages = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const { conversationId } = req.params;

  const messages = await MessageService.messages({
    conversationId,
    limit,
    page,
  });

  if (messages?.error) {
    return res.status(500).json({ error: messages?.message });
  }

  return res.status(200).json(messages);
};

module.exports = Messages;
