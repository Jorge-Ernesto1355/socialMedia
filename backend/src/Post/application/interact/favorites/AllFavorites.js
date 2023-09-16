const User = require("../../../../users/domain/UserModel");
const Post = require("../../../dominio/Post")

const allUsersHasGivenFavorite =  async (req, res)=>{

  const {postId} = req.query

  if(postId){
    try {
  
      const post = await Post.findById(postId)
      
       
     const allfavorites = await Promise.all(
      post.favorites.map((userId) => {
        return User.findById(userId);
      })
    );
      const users = allfavorites.map(user => {
       return {
         _id:user._id, 
         username:user.username, 
         imageProfile:user.imageProfile
       }
      })

      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({message:"algo salio mal"})
    }

  }

  return res.status(400).json({message:'proporciona el id'})


}

module.exports = allUsersHasGivenFavorite