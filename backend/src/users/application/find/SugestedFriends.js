const InfiniteScrollQuerys = require("../../../libs/InfiniteScrollQuerys");
const userService = require("../../userService");

const SuguestedFriends = async (req, res) => {
  const { userId } = req.params;
  const limit = parseInt(req.query.limit, 10) || InfiniteScrollQuerys.limit;
  const page = parseInt(req.query.page, 10) || InfiniteScrollQuerys.page;

  const SuguestedFriends = await userService.recomendedFriends({
    userId,
    limit,
    page,
  });

  if (SuguestedFriends?.error)
    return res.status(500).json({ error: SuguestedFriends?.message });

  return res.status(200).json(SuguestedFriends);
};

module.exports = SuguestedFriends;
