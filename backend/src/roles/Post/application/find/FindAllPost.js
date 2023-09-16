const Post = require('../../dominio/Post')


const FindAllPost = async (req, res)=>{

  const posts =  await Post.find().populate('feeling').populate('votes')
  

  return res.status(200).json(posts)
  

}

module.exports  = FindAllPost