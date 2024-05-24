
const userService = require("../../userService")


const hideAllPosts =  async (req, res)=>{

  const {userId, userIdToHide} = req.params
  
  const postHidden = await userService.hideAllPosts({userId, userIdToHide})

  if(postHidden?.error){
    return res.status(500).json({error: postHidden.message})
  }

  return res.status(200).json(postHidden)
  
}

module.exports = hideAllPosts