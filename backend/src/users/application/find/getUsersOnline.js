const User = require("../../domain/UserModel");
const userService = require("../../userService");

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

const getUsersOnline = async (req, res) => {
  const { userId } = req.params;

  const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
  const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;

  const usersOnline = await userService.getUsersOnline({ userId, limit, page });

  if (usersOnline?.error) {
    return res.status(500).json({ error: usersOnline.message });
  }

  return res.status(200).json(usersOnline);
};

module.exports = getUsersOnline;
