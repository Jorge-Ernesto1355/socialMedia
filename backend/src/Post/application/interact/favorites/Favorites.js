
const Post = require("../../../dominio/Post")
const User = require('../../../../users/domain/UserModel')

const Favorites = async (req, res)=>{

  const {userId} = req.query
  const {postId} = req.params

  //userId es para guardarlo en favorites
  //postId el donde vamos a guardar el userId


  try {

    const post = await Post.findById(postId)
    const user = await User.findById(userId)
  
     if(!post.favorites.includes(userId)){
      

        await post.updateOne({$push: {favorites : userId}})
        await user.updateOne({$push: {favorites : userId}})
        return res.status(201).json({message:"se ha agregado a favoritos"})
      
     }
    else{
    await post.updateOne({$pull:{favorites:userId}})
    await user.updateOne({$pull: {favorites : userId}})
    return res.status(200).json({message:"se quito de favoritos"})
  }

  } catch (error) {
   
   return  res.status(500).json({message:"algo salio mal"})
  }

}

module.exports = Favorites
 