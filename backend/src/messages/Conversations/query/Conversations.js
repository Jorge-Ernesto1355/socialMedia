const InfiniteScrollQuerys = require("../../../libs/InfiniteScrollQuerys");
const ConversationService = require("../../ConversationService");

const getConversations = async (req, res) => {
  const { userId } = req.params;
  const limit = parseInt(req.query.limit, 10) || InfiniteScrollQuerys.limit;
  const page = parseInt(req.query.page, 10) || InfiniteScrollQuerys.page;

  const conversations = await ConversationService.conversations({
    userId,
    limit,
    page,
  });

  if (conversations?.error) {
    return res.status(500).json({ error: conversations?.message });
  }

  return res.status(200).json(conversations);
};

module.exports = getConversations;
