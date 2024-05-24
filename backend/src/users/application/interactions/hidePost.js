const User = require("../../domain/UserModel")
const userService = require("../../userService")


const hidePost =  async (req, res)=>{

  const {userId, postId} = req.params
  
  const postHidden = await userService.hidePost({userId, postId})

  if(postHidden.error){
    return res.status(500).json({error: postHidden.message})
  }

  return res.status(200).json(postHidden)
  
}

module.exports = hidePost