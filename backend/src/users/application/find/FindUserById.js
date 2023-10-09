const User = require("../../domain/UserModel")
const userService = require("../../userService")




const FindUserById = async (req, res)=>{

  const {userId} = req.params

  const user = await userService.get({userId})

  if(user?.error){
    return res.status(500).json({message: user.message})
  }

  return res.status(200).json(user)
}


module.exports = FindUserById