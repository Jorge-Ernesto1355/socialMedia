
const userService = require("../../userService")

const getUserByUsername =  async (req, res)=>{

  const {username} = req.params

  
  if(!username) return res.status(500).json({message: "no arguments enough"})
  
  const user = await userService.getUserByUsername({username})

  if(user.error){
    return res.status(500).json({error: user.message})
  }

  return res.status(200).json(user)
  
}

module.exports = getUserByUsername