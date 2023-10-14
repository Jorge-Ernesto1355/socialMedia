const userService = require("../../userService");

const getUsersTagged = async (req, res) => {
  const { containerId } = req.params;

  const usersTagged = await userService.usersTagged({ containerId });

  if (usersTagged?.error) {
    return res.status(500).json({ error: usersTagged?.message });
  }

  return res.status(200).json(usersTagged);
};

module.exports = getUsersTagged;
