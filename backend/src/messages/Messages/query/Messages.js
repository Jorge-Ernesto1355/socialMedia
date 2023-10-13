const Messages = async (req, res) => {
  const messages = await MessageService.messages({});

  if (messages?.error) {
    return res.status(500).json({ error: messages?.message });
  }

  return messages;
};

module.exports = Messages;
