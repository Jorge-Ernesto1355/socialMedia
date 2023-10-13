const MessageService = require("../../MessageService");

const updateMessage = async (req, res) => {
  const updatedMessages = await MessageService.update({});

  if (updatedMessages?.error) {
    return res.status(500).json({ error: updatedMessages.message });
  }

  return res.status(204).json({ message: "message updated" });
};

module.exports = updateMessage;
