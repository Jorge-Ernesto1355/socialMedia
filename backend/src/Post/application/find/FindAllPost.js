const PostService = require("../../PostService");
const Post = require("../../dominio/Post");

const FindAllPost = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;

  console.log('siisisi')

  
    const posts = await PostService.getAll({limit, page})

    if(posts.error){
      return res.status(400).json({ message: posts.error.message });
    }
    
    return res.status(200).json(posts);
  
};

module.exports = FindAllPost;
