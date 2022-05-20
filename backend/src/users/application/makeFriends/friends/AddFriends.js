const User = require('../../../domain/UserModel')



const  addFriends = async (req, res)=>{

  const {userId, addUser} = req.query
  



  // userId donde vamos agregar el usuario 
  //addUser usuario que queremos añadir
  
  try {

    const user = await User.findById(userId)

    if(!user.friendsWaiting.includes(addUser)){
      await user.updateOne({$push:{ friendsWaiting: addUser}})

      await user.save()
      res.status(201).json({message:"se ha mandado solicitud"})
    }
    else{
      res.status(200).json({message:"no puedes enviar dos veces solicitud"})
    }

    
    
  } catch (error) {
    res.status(500).json({message:"algo salio mal "})
  }
}

module.exports = addFriends

