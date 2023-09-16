const Post = require("../../../dominio/Post")
const User = require('../../../../users/domain/UserModel')

const Share = async (req, res)=>{

  const {userId, postId} = req.query
  const {id} = req.params
 
   // userId es el id que vamos a meter en shares
   // id es el id del post que vamos a meter en en
console.log(userId, postId)
console.log(id)
  try {

    const post = await Post.findById(id)
    const user = await User.findById(userId)
  
     if(!post.shares.includes(userId)){
      if(!user.posts.includes(id)){

        await post.updateOne({$push:{shares:postId}})
        user.posts = [...user.posts, post._id]
        await user.save()
        return res.status(201).json({message:"se ha compartido"})
      }
       return res.status(500).json({message:"no puedes compartir tu propio post"})
     }
    else{
    
    return res.status(200).json({message:"no puedes compartir dos veces"})
  }

  } catch (error) {
    
   return  res.status(500).json({message:"algo salio mal"})
  } 
}

module.exports = Share
 