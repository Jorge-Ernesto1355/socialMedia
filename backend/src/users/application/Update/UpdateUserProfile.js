const userService = require("../../userService");

const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const userInfo = req.body;

  const user = await userService.updateInfo({ userId, userInfo });

  if (user?.error) {
    return res.status(500).json({ error: user.message });
  }

  return res.status(202).json(user);
};

module.exports = updateUserProfile;
