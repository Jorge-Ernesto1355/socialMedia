const userService = require("../../userService");

const getSameInterestUsers = async (req, res) => {
  const { userId} = req.params;
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
 

  const sameInterestUser = await userService.getSameInterestUsers({userId, limit, page});

  if (sameInterestUser?.error)
    return res.status(500).json({ error: sameInterestUser?.message });

  return res.status(200).json(sameInterestUser);
};

module.exports = getSameInterestUsers;
