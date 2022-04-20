const Post = require("../../dominio/Post")

const GiveLike = async (req, res)=>{

  try {
    const post = await post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({message:"The post has been liked"});
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({message:"The post has been disliked"});

    }
  } catch (err) {
    res.status(500).json(err);
  }
}


module.exports = GiveLike