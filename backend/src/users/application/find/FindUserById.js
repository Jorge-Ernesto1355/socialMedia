const User = require("../../domain/UserModel")
const client = require('../../../redis/client')



const FindUserById = async (req, res)=>{
 const {id} = req.params
try {
    
 const user =  await User.findById(id).populate('roles')
 const {password, updateAt, ...other} = user;



  return res.status(200).json(other._doc)
 

  

} catch (error) {
    return res.status(500).json({message:"recursos no encontrados"})
}
}


module.exports = FindUserById