const MessageService = require("../../MessageService");

const Message = async (req, res) => {
  const { messageId } = req.params;

  const message = await MessageService.message({ messageId });

  if (message?.error) {
    return res.status(500).json({ error: message?.message });
  }

  return res.status(200).json(message);
};

module.exports = Message;
