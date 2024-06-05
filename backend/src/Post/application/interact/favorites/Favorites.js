
const PostService = require("../../../PostService")

const Favorites = async (req, res)=>{

  const {userId} = req.query
  const {postId} = req.params

  if(!userId || !postId) return res.status(500).json({message:"missing parameters"})

  const favorites = await  PostService.saveFavorites({userId, postId})



  if(favorites?.error) return res.status(500).json({message: favorites.message})

  if(!favorites?.error) return res.status(200).json({message: favorites.message})


}

module.exports = Favorites
 