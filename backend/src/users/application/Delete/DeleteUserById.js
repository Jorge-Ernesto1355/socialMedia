const Post = require("../../../../Post/dominio/Post")
const User = require("../../domain/UserModel")


const DeleteUser = async (req, res)=>{
  const {id} = req.params
 

  
  if(!!id  || req.body.Admin){
    
    await User.findByIdAndDelete(id)

    return res.status(204).json({message:"se ha borrado"})
   
  }else{
    res.status(403).json({
      message:"no puedes eliminar una cuenta que no es tuya"
    })
  }
}

module.exports = DeleteUser