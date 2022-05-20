const User = require("../../../domain/UserModel")
const redisClient = require('../../../../redis/redisClient')
const deleteRelationShip = async (req, res)=>{

  const {userId, deleteUser} = req.query


  //userId user donde vamos a borrar el deleteUser
  //deleteUser el usuario que vamos a borrar
  
  
  if(userId && deleteUser){

    try {
      
      const user = await User.findById(userId)
      const userDelete = await User.findById(deleteUser)

        if(!user.relationShip.includes(deleteUser)){
        
          return res.status(500).json({message:"no esta el usuario en tu lista relationShip"})
       }
       

         await user.updateOne({$pull:{relationShip:deleteUser}})
         await userDelete.updateOne({$pull:{relationShip:userId}})

        await user.save()
         await userDelete.save()

         //actualizar el redis
        
         
         return res.status(202).json({message:"borrado de tu lista de amigo"})
       

    } catch (error) {
      console.log(error)
      return  res.status(500).json({message:"algo salio mal"})
    }
  }

  return res.status(500).json({message:"recursos no encontrados"})

}
module.exports = deleteRelationShip