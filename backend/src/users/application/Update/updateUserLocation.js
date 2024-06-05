const userService = require("../../userService");

const updateUserLocation = async (req, res) => {
  const { userId } = req.params;
  const location = req.body;

  const user = await userService.editUserLocation({ userId, location });

  if (user?.error) {
    return res.status(500).json({ error: user.message });
  }

  return res.status(202).json(user);
};

module.exports = updateUserLocation;
