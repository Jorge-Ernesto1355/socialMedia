const Post = require("../dominio/Post")

const findPostById = async (req, res)=>{

  const post = await Post.findById(req.params.id)
  res.status(200).json(post)
}

module.exports  = findPostById