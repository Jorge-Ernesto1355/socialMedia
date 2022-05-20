const User = require("../../../domain/UserModel")

const deleteFriends = async (req, res)=>{

  const {userId, deleteUser} = req.query


  //userId user donde vamos a borrar el deleteUser
  //deleteUser el usuario que vamos a borrar
  
  if(userId){
    try {
      
      const user = await User.findById(userId)
      const userDelete = await User.findById(userDelete)
        if(!user.friends.includes(deleteUser)){
        
          return res.status(500).json({message:"no esta el usuario en tu lista de amigos"})
        }else{
          await user.UpdateOne({$pull:{friends:deleteUser}})
          await userDelete.UpdateOne({$pull:{friends:userId}})

          await user.save()
          await userDelete.save()
          res.status(204).json({message:"borrado de tu lista de amigo"})
        }

    } catch (error) {
      res.status(500).json({message:"algo salio mal"})
    }
  }

}
module.exports = deleteFriends