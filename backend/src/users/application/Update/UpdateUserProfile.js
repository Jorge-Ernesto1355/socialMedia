const userService = require("../../userService");

const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;

  const userInfo = await userService.updateInfo({ userId, password });

  if (userInfo?.error) {
    return res.status(500).json({ error: userInfo.message });
  }

  return res.status(202).json(userInfo);
};

module.exports = updateUserProfile;
