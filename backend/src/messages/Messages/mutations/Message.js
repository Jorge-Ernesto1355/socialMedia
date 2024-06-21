const MessageService = require("../../MessageService");
const {
  validateMessage,
} = require("../../utils/validate/Message/MessageShema");

const Message = async (req, res) => {
  const { to, from, conversationId, text, isRead, reply } = req.body;

  const result = validateMessage({ to, from, conversationId, message: text });

  if (result.error) {
    return res.status(400).json({ error: result.error.message });
  }

  const file = req?.files?.image;

  const message = await MessageService.create({
    to,
    from,
    conversationId,
    message: text,
    isRead,
    reply,
    file,
    storyId: req.body.storyId, 
    reactionShared: req.body.reactionShared
  });

  if (message?.error) {
    return res.status(500).json({ error: message?.message });
  }

  return res.status(201).json(message);
};

module.exports = Message;
