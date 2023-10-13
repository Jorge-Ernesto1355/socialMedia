const MessageService = require("../../MessageService");

const Message = async (req, res) => {
  const result = validateMessage();

  if (result.error) {
    return res.status(400).json({ error: result.error.message });
  }

  const message = await MessageService.create({});

  if (message?.error) {
    return res.status(500).json({ error: message?.message });
  }

  return message;
};

module.exports = Message;
