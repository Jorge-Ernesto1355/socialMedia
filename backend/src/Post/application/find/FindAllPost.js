const Post = require('../../dominio/Post')


const FindAllPost = async (req, res)=>{

  const posts =  await Post.find()
  
  

  

  res.status(200).json(posts)
  

}

module.exports  = FindAllPost