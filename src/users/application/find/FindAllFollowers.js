const User = require("../../domain/UserModel")



const FindALLFollowers =  async ()=>{
  const user = await User.findById(req.params.userId)
  const friends = await Promise.all(
    user.followings.map((friendId)=>{
      return User.findById(friendId)
    })
  )
}