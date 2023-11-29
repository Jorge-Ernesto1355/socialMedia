const MessageService = require("../../MessageService");

const Message = async (req, res) => {
  const { conversationId } = req.params;
  const { userId } = req.query;

  const unRead = await MessageService.unReadMessage({ conversationId, userId });

  if (unRead?.error) {
    return res.status(500).json({ error: unRead?.message });
  }

  return res.status(200).json(unRead);
};

module.exports = Message;
