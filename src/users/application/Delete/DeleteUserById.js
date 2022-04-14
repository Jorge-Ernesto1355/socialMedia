const User = require("../../domain/UserModel")


const DeleteUser = async (req, res)=>{
  const {id} = req.params
  
  if(!!id  || req.body.Admin){
    console.log('im here')
    await User.findByIdAndDelete(id)
    return res.status(204).json({})
   
  }else{
    res.status(403).json({
      message:"no puedes eliminar una cuenta que no es tuya"
    })
  }
}

module.exports = DeleteUser