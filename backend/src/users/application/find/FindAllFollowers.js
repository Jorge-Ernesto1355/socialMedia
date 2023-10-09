const User = require("../../domain/UserModel")
const userService = require("../../userService")

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

const FindALLFollowers =  async (req, res)=>{

  const {userId} = req.params
  
  const limit = parseInt(req.query.limit, 10)  || DEFAULT_LIMIT;
  const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;

 
  
  const friends = await userService.getFriends({userId, limit, page})

  if(friends.error){
    return res.status(500).json({error: friends.message})
  }

  return res.status(200).json(friends)
  
}

module.exports = FindALLFollowers