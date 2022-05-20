const { use } = require("../../nodemailer/Mailer")
const User = require("../../users/domain/UserModel")

const RemoveRoles = async (req, res)=>{

  const {userId, role, userRole}  = req.query
  let user
  let UserDelRol
  
  //userId el user que va eliminar el role
  //userRole el user al que le van a eliminar el role
    try {
      user = await User.findById(userId)
      UserDelRol = await User.findById(userRole)
      
    } catch (error) {
      return res.status(400).json({message:"algo salio mal"})
    }
  
if(role){

  if(!UserDelRol.roles.includes(role)){
    return res.status(500).json({message:"no se puede elimianr"})
  }
  const userRolAdmin = await user.roles.includes('6273909ca278e8cc7379c551')

  if(userRolAdmin || user.username === 'admin'){
    
    if(user.username === 'admin' ){
      await UserDelRol.updateOne({$pull:{roles:role}})
      await user.save()
      return res.status(204).json({message:"borrado"})
    }

    if(UserDelRol.roles.includes('6273909ca278e8cc7379c551')){
      return res.status(403).json({message:"no estas permitido"})
    }

      await UserDelRol.updateOne({$pull:{roles:role}})
      await user.save()
      return res.status(204).json({message:"borrado"})
    
  }
  return res.status(403).json({message:"no estas permitido"})
}
return res.status(404).json({message:"role no existe"})
}

module.exports = RemoveRoles