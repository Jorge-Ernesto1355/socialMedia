
const userService = require("../../../userService")
const AcceptFriends = async (req, res)=>{

  const {userId, addUserId, accept} = req.query

    const acceptUser = await userService.acceptFriend({userId, addUserId, accept})

    if(acceptUser?.error){
      return res.status(500).json({error: acceptUser.message})
    }

    return res.status(200).json({message: 'accepted friend'})
  
}

module.exports = AcceptFriends