const userService = require("../../userService");

const deleteFriend = async (req, res) => {
  const { friendId, userId } = req.params;

  const friendDeleted = await userService.deleteFriend({ friendId, userId });

  if (friendDeleted?.error)
    return res.status(500).json({ error: friendDeleted?.message });

  return res.status(203).json({ message: "friend deleted" });
};

module.exports = deleteFriend;
