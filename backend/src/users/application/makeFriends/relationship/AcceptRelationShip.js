const User = require('../../../domain/UserModel')


const makeRelationShip =  async (req, res)=>{

  const {userId, userAddRelation, accept} = req.query

  //userId es el usuario que vamos a solicitar
  // userAddRelation es el usuario que vamos agregar a nuestra lista de relationSip

  const user = await User.findById(userId)
  const userAdd = await User.findById(userAddRelation)
  
  //user es el usuario al que le vamos a agregar el userAdd
  //userAdd el usuario a agregar

    if((user && userAdd)){
    
        try {
          
         
          if(user.relationShipWaiting.includes(userAddRelation)){
            
            if(accept){
              
              if(!user.relationShip.includes(userAddRelation)){
                
              await user.updateOne({$push:{ relationShip: userAddRelation}})
              await userAdd.updateOne({$push:{ relationShip: userId}})
              await user.updateOne({$pull:{ relationShipWaiting: userAddRelation}})
              
              
            await user.save()
            await userAdd.save()
              
              
              return res.status(200).json({message:"se ha agregado"})
              }
              

            }

            if(accept === false){
              await user.updateOne({$pull:{ relationShipWaiting: userAddRelation}})
              await user.save()
              res.status(204)
            }
            

             return  res.status(204).json({message:"no puedes agregar dos veces"})
          
          }
         
        } catch (error) {
         console.log(error)
          return res.status(500).json({message:"algo salio mal"})
        }

  }
  return res.status(404).json({message:"recursos no encontrados"})

}

module.exports = makeRelationShip