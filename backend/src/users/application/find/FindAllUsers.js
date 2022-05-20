const User = require("../../domain/UserModel")
const client = require('../../../redis/client')

const findAllUsers = async (req, res)=>{
 
  const Users = await User.find().select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

  
   
   
    return res.status(200).json(Users)
  
  

}



module.exports = findAllUsers