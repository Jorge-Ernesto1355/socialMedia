const Post = require('../../../Post/dominio/Post')
const userService = require('../../userService')

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

const getPosts = async (req, res)=>{

  const limit = parseInt(req.query.limit, 10)  || DEFAULT_LIMIT;
  const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;

  const {userId} = req.params
 
  const posts = await userService.getPosts({userId, limit, page})

  if(posts?.error)
    return res.status(400).json({ error: posts.message });

  return res.status(200).json(posts)

  
}

module.exports  = getPosts