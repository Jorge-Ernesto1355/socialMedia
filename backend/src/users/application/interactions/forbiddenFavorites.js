
const userService = require("../../userService")


const forbidderFavorites =  async (req, res)=>{

  const {userId} = req.params
  
  const postHidden = await userService.forbiddenFavorites({userId})

  if(postHidden?.error){
    return res.status(500).json({error: postHidden.message})
  }

  return res.status(200).json(postHidden)
  
}

module.exports = forbidderFavorites