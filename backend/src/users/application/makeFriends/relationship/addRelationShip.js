const User = require('../../../domain/UserModel')
const redisClient = require('../../../../redis/redisClient')

const  addRelation = async (req, res)=>{

  const {userId, addUser} = req.query
  
 


  // userId donde vamos agregar el usuario 
  //addUser usuario que queremos añadir

  if((userId && addUser)){
    try {
      
       
      const user  = await User.findById(userId)
     
      
  
      if(!user.relationShipWaiting.includes(addUser)){
        await user.updateOne({$push:{ relationShipWaiting: addUser}})

        await user.save()
        
        return res.status(201).json({message:"se ha mandado solicitud"})
      }
      
      return res.status(200).json({message:"no puedes enviar dos veces solicitud"})
      
  
      
      
    } catch (error) {
      
      return res.status(500).json({message:"algo salio mal"})
    }

  }
  return res.status(500).json({message:"proporcuiona los recursos"})
}
module.exports = addRelation

