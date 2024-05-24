const User = require("../../domain/UserModel")
const userService = require("../../userService")


const unFollow =  async (req, res)=>{

  const {userId, friendId} = req.params
  
  const unFollow = await userService.unFollow({userId, friendId})

  if(unFollow?.error){
    return res.status(500).json({error: unFollow?.message})
  }

  return res.status(200).json(unFollow)
  
}

module.exports = unFollow