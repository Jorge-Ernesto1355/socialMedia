const MessageService = require("../../MessageService");

const markAsRead = async (req, res) => {
  const { conversationId } = req.params;
  const { userId } = req.query;

  const read = await MessageService.read({ conversationId, userId });

  if (read?.error) {
    return res.status(500).json({ error: read?.message });
  }

  return res.status(200).json(read);
};

module.exports = markAsRead;
