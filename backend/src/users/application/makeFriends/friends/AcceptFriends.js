const User = require("../../../domain/UserModel")
const AcceptFriends = async (req, res)=>{

  const {userWaiting, userAccept, accept} = req.query

  //userWaiting es el user que esta esperando a que lo acepten
  //userAccept es el user que va aceptar

  const userForAccept = await User.findById(userAccept)


  if(!userForAccept.friendsWaiting.includes(userWaiting)){
    return res.status(500).json({message:"no estas en la lista de espera"})

  }

 try {

  if(accept){

    await userForAccept.updateOne({$pull:{friendsWaiting:userWaiting}})
      await userForAccept.updateOne({$push:{friends:userWaiting}})
      
      return res.status(200).json({message:"acceptado"})
  }

   await userForAccept.updateOne({$pull:{friendsWaiting:userWaiting}})
    return res.status(200).json({message:"se ha cancelado la solicitud"})
    
 } catch (error) {
   
 }
     
    
   
    
  


}

module.exports = AcceptFriends