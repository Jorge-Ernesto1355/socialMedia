const User = require("../../../src/users/domain/UserModel");
const Post = require("../../dominio/Post");

const FindCurrentPost = async (req, res,)=>{
  

  const {userId} = req.query

    try {
      
    const currentUser = await User.findById(userId);
    const userPosts = await Post.find({ userId: currentUser._id });


    const friendPosts = await Promise.all(
      currentUser.friends.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts))
  } catch (err) {

    res.status(500).json(err);
  }

}

module.exports = FindCurrentPost