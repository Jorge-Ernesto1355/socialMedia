const User = require("../../domain/UserModel")



const FindALLFollowers =  async ()=>{

  const {userId} = req.query

  if(userId){
    try {
      const user = await User.findById(userId)
    const friends = await Promise.all(
    user.followings.map((friendId)=>{
      return User.findById(friendId)
    })
  )
  if(!friends){
    res.status(404).json({message:"amigos no encontrados ;("})
  }

  res.status(200).json(friends)
    } catch (error) {
     res.status(500).json({message:"algo salio mal "})
    }
  }

  const friends = await Promise.all(
    user.followings.map((friendId)=>{
      return User.findById(friendId)
    })
  )

  
}

module.exports = FindALLFollowers