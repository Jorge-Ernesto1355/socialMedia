const userService = require("../../../userService");
const AcceptFriends = async (req, res) => {
  const { addUserId, accept } = req.query;
  const { userId } = req.params;

  const acceptUser = await userService.acceptFriend({
    userId,
    addUserId,
    accept,
  });

  if (acceptUser?.error) {
    return res.status(500).json({ error: acceptUser?.message });
  }

  return res.status(200).json({ message: acceptUser?.message });
};

module.exports = AcceptFriends;
