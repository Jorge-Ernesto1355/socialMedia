const Post = require("../../dominio/Post")

const createPost = async (req, res)=>{
  const {description, img, userId} = req.body

  const postCreated = await new Post({description, img, userId})
  await Post.save()
  res.status(201).json(postCreated)
}

module.exports = createPost