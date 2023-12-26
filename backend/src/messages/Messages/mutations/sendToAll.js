const MessageService = require("../../MessageService");

const sendToAll = async (req, res) => {
  const { userId } = req.params;
  const { friends, message } = req.body;

  const sendToAllMessage = await MessageService.sendToAll({
    userId,
    friends,
    message,
  });

  if (sendToAllMessage?.error)
    return res.status(500).json({ message: sendToAllMessage?.message });
  return res.status(201).json({ message: sendToAllMessage });
};

module.exports = sendToAll;
