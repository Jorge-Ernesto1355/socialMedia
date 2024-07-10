
const userService = require("../../userService")


const getFavoritesPost = async (req, res)=>{

    const { userId } = req.params;
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

   if (!userId) return res.status(500).json({ message: "something went wrong" });

  const favoritesPosts = await userService.getFavoritesPost({userId, limit, page})

  if(favoritesPosts.error){
    return res.status(500).json({error: favoritesPosts.message})
  }

  return res.status(200).json(favoritesPosts)
 
  

}



module.exports = getFavoritesPost