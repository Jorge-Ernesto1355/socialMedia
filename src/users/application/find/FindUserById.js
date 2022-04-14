const User = require("../../domain/UserModel")

const FindUserById = async (req, res)=>{
 const {id} = req.params

 
 
 const user =  await User.findById(id)
 const {password, updateAt, ...other} = user;
    res.status(200).json(other._doc)
     

  
  
}


module.exports = FindUserById