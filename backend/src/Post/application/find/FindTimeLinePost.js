const Post = require("../../dominio/Post");
const UserModel = require('../../../users/domain/UserModel');
const calculatePoints = require("../interact/utils/calculatePoints/calculatePoints");
const { paginate } = require("mongoose-paginate-v2");
const findTimeLine = async (req, res) => {

  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const {userId} = req.params

  if(!userId) return res.status(500).json({ message: "algo salio mal" });
 
  try {
    const user = await UserModel.findById(userId).select(['friends', 'posts']).lean()



    //get all friendsPost with $in operator on users.friends
    const friendsPostsId = await Promise.all(
      user?.friends?.map((friendId)=>{
        return UserModel.findById(friendId).select(['posts']).lean()
      })
    )


    // concatenar the usersPosts with their friends 
    const currentUserAndFriendsPosts = Array.prototype.concat.apply(user.posts, friendsPostsId?.posts)

      
    // //we add totalPoints to sort them leater
    //   const postsWithTotalPoints = currentUserAndFriendsPosts?.map((post)=>{
    //     if(post){
    //       const points = calculatePoints(post?.reactions)
    //       post.totalPoints = points
    //       return post
    //  } 
    //   })

    // // all posts ordered by major or menos to the method sort
    // const orderedPosts = postsWithTotalPoints.sort((a, b) => b.totalPoints.totalPoints - a.totalPoints.totalPoints);

    Post.paginate({_id:{$in:currentUserAndFriendsPosts}}, {}, (err, result)=>{

      if(err) return res.status(500).json({ message: "algo salio mal" });

      const postsWithTotalPoints = result?.docs?.map((post)=>{
            
      })
   
      
      return res.status(200).json({
        result
      });



   });
    
  } catch (error) {
    return res.status(500).json({ message: error.message});
  }
};

module.exports = findTimeLine;
