const userService = require("../../userService");

const getUsersFromFriends = async (req, res) => {
  const { userId} = req.params;
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;

  const userFromFriends = await userService.getUsersFromFriends({ userId, limit, page});

  if (userFromFriends?.error)
    return res.status(500).json({ error: userFromFriends?.message });

  return res.status(200).json(userFromFriends);
};

module.exports = getUsersFromFriends;
