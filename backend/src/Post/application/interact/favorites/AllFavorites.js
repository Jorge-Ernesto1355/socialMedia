
const PostService = require("../../../PostService");


const getFavorites =  async (req, res)=>{

  const {postId} = req.params
  
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const favorites = await PostService.showFavorites({postId, limit, page})

  if(favorites.error) return res.status(500).json({error: favorites.error.message})

  if(!favorites.error) return res.status(200).json(favorites)
}

module.exports = getFavorites