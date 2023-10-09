const UserModel = require("../../../domain/UserModel");
const userService = require("../../../userService");

const addFriends = async (req, res) => {
  const { userId } = req.params;
  

  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;


  const userWaiting = await userService.requestsFriends({userId, limit, page})

  if(userWaiting?.error){
    return res.status(500).json({error: userWaiting.message})
  }

  return res.status(200).json(userWaiting)
  
};

module.exports = addFriends;
