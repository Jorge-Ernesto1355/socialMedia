const Post = require("../../../dominio/Post")
const User = require('../../../../src/users/domain/UserModel')

const Share = async (req, res)=>{

  const {userId} = req.query
  const {id} = req.params

  try {

    const post = await Post.findById(id)
    const user = await User.findById(userId)
    

    


     if(!post.shares.includes(userId)){
    await post.updateOne({$push: {shares : userId}})
    res.status(201).json({message:"se ha compartido"})
    user.posts = [...user.posts, post._id]
    await user.save()
    
  }
  else{
    await post.updateOne({$pull:{shares:userId}})
    res.status(200).json({message:"se ha dejado de compartir"})
  }

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }

 

  

  
  
}

module.exports = Share
 