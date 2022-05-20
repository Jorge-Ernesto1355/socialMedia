const Post = require('../../../dominio/Post')


const GiveLike = async (req, res)=>{
  const {userId} = req.query
  
  try {
    const post = await Post.findById(req.params.id);
   
    
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(201).json({message:"se ha dado like"});
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({message:"se quito el like"});

    }
  } catch (err) {
    console.log(err)
    res.status(500).json({message:"algo salio mal"});
  }
}


module.exports = GiveLike