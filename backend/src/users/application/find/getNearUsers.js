const userService = require("../../userService");

const getNearUsers = async (req, res) => {
  const { userId} = req.params;
  const {lat, lng, maxDistance} = req.query
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;

  const nearUsers = await userService.nearUsers({ userId, lat, lng, maxDistance, limit, page });

  if (nearUsers?.error)
    return res.status(500).json({ error: nearUsers?.message });

  return res.status(200).json(nearUsers);
};

module.exports = getNearUsers;
