const { update } = require("../dominio/Post")
const Post = require("../dominio/Post")

const Update = async (req, res)=>{


  const {id} = req.params
  const post = await Post.findById(id)
  const {userId} = req.query
  const {description} = req.body
  

  if(userId === post.userId){
    const updatePost = await Post.findByIdAndUpdate(id, {description})
    updatePost.edit = true
    await updatePost.save()
    return  res.status(200).json(updatePost)
  }else{
  return  res.json(304).json({message:"no modificado"})
  }


}

module.exports  = Update