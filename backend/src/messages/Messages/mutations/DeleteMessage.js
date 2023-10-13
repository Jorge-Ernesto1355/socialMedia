const MessageService = require("../../MessageService");

const DeleteMessage = async (req, res) => {
  const deletedMessages = await MessageService.delete({});

  if (deletedMessages?.error) {
    return res.status(500).json({ error: deletedMessages.message });
  }

  return res.status(204).json({ message: "message deleted" });
};

module.exports = DeleteMessage;
