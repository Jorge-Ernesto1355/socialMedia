const Post = require("../dominio/Post")

const Update = async (req, res)=>{


  const {id} = req.params
  const post = await Post.findById(id)



  const jorge_guapo = 'jorge'
  if(req.body.userId === post.userId){
    const  updatePost = await Post.findByIdAndUpdate(id, req.body)
    res.status(200).json(updatePost)
  }else{
   res.json(304).json({message:"no modificado"})
  }


}

module.exports  = Update