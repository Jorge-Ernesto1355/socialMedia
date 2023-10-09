
const userService = require("../../userService")

const DeleteUser = async (req, res)=>{
  const {userId} = req.params
 

  const user = await userService.delete({userId})


  if(user?.error){
    return res.status(500).json({error: user.message})
  }

  return  res.status(200).json({message:"User deleted"})
  
}

module.exports = DeleteUser