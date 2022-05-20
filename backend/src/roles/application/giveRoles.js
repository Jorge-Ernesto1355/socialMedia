const {checkRolesExisted} = require('../../middleware/middleware')
const User = require('../../users/domain/UserModel')
const Role = require('../dominio/Role')
const Roles = require('../../roles/application/roles')



const giveRoles = async (req, res, next)=>{

  const {userId, userAddRole} = req.query
  const {roles} = req.body

  //userId el que va agregar el role
  //userAddRole el usuario al que le vamos agregar el role
  

  try {
    const user = await User.findById(userId)
    const userRole = await User.findById(userAddRole)
  
   
 
    if(user.roles.includes('6273909ca278e8cc7379c551')){
      
      if(roles){
        for (let i = 0; i < roles.length; i++) {
          if (!Roles.includes(roles[i])) {
            return res.status(400).json({
              message: `Role ${roles[i]} no existe`,
            });
          }
        }
      }
      
      const RolesFound = await Role.find({name:{$in : roles}})
      const rolesId = RolesFound.map(role=> role._id)
      
  
      //para saber si ya hay roles repetidos
  
      if(RolesFound){
        for (let i = 0; i < roles.length; i++) {
          if(userRole.roles.includes(RolesFound[i]._id)){
            return res.status(500).json({message:"roles no repetedidos"})
          }
      }}
  
      
      userRole.roles = [...userRole.roles, rolesId ]
      await userRole.save()
  
      return res.status(202).json({message:"role implementado"})

    }

    return res.status(403).json({message:"no estas permitido"})

    //para saber si un rol existe

    
  } catch (error) {
   console.log(error)
    return res.status(500).json({message:"algo salio mal"})
  }


}

module.exports = giveRoles