
const userService = require("../../userService")


const findAllUsers = async (req, res)=>{
 

  const users = await userService.getUsers()

  if(users.error){
    return res.status(500).json({error: users.message})
  }

  return res.status(200).json(users)
 
  

}



module.exports = findAllUsers