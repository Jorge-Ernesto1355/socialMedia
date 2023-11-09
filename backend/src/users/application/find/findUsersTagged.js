const userService = require("../../userService");

const findUsersTagged = async (req, res) => {
  const { postId } = req.params;

  const usersTagged = await userService.usersTagged({ postId });

  if (usersTagged?.error)
    return res.status(500).json({ error: usersTagged?.message });

  return res.status(200).json(usersTagged);
};

module.exports = findUsersTagged;
