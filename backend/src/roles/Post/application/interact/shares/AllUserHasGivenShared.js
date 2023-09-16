
const Post = require("../../../dominio/Post")

const allUsersHasGivenShared =  async (req, res)=>{

  const {postId} = req.query

  if(postId){
    try {
  
      const post = await Post.findById(postId)
      
       
     const allPostsShared = await Promise.all(
      post.shares.map((postId) => {
        return Post.findById(postId);
      })
    );


      

      
      return res.status(200).json(allPostsShared)
    } catch (error) {
      return res.status(500).json({message:"algo salio mal"})
    }

  }

  return res.status(400).json({message:'proporciona el id'})


}

module.exports = allUsersHasGivenShared