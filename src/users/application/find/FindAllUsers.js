const User = require("../../domain/UserModel")


const findAllUsers = async (req, res)=>{
  const Users = await User.find()
  res.status(200).json(Users)
  

}



module.exports = findAllUsers