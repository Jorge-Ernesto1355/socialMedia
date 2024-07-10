
const userService = require("../../userService")


const getUserPosts = async (req, res)=>{
 

  const {userId} = req.params
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;

  const userPosts = await userService.getUserPosts({userId, limit, page})

  if(userPosts.error){
    return res.status(500).json({error: userPosts.message})
  }

  return res.status(200).json(userPosts)
 
  

}



module.exports = getUserPosts