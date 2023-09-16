const Post = require('../../dominio/Post')


const FindAllPost = async (req, res)=>{

  const limit = parseInt(req.query.limit, 10) || 10
  const page = parseInt(req.query.page, 10) || 1
  const posts =  await Post.paginate({}, {limit, page})
  console.log(posts)
  return res.status(200).json(posts)
  

}

module.exports  = FindAllPost