const exits = require("../libs/exits");
const isValidObjectId = require("../libs/isValidObjectId");
const User = require("./domain/UserModel");
const Post = require("../Post/dominio/Post");
const fs = require("fs-extra");
const { default: mongoose } = require("mongoose");
const cloudinaryService = require("../libs/cloudynary");
const UserModel = require("./domain/UserModel");


module.exports = class userService {
  static async getUsers() {
    try {
      if (!mongoose.models["User"]) throw new Error("model not found");
      const users = await User.find();
      return users;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async get(object) {
    try {
      exits(object);

      console.log(object)
      const { userId, options = [] } = object;

      const queryOptions = {
        model: "User",
        select: [
          "username",
          "email",
          "imageProfile",
          "socketId",
          "status",
          "coverPicture",
          "bio", 
          "interests",
          ...options,
        ],
      };

      const user = await isValidObjectId({ _id: userId }, queryOptions);

      if (user?.error) {
        throw new Error(user.message);
      }

      return user;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  
  static async getFriends(object) {
    try {
      exits(object);
      const { userId, limit, page, select = [] } = object;
      const queryOptions = {
        model: "User",
        select: ["friends"],
      };

      const user = await isValidObjectId({ _id: userId }, queryOptions);

      if (user.error) {
        throw new Error(user.message);
      }

      const options = {
        limit,
        page,
        select: ["username", "email", "imageProfile", "status", "socketId", ...select],
      };

      const friendsIds = user.friends.map((friendId) => friendId);

      const friends = await User.paginate(
        { _id: { $in: friendsIds } },
        options
      );

      return friends;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async getPosts(object) {
    try {
      exits(object);
      const { userId, limit, page } = object;
     
      const queryOptions = {
        model: "User",
        select: ["posts"],
      };
      const user = await isValidObjectId({ _id: userId }, queryOptions);

      if (user.error) {
        throw new Error(user.message);
      }

      const postsId = user?.posts?.map((postId) => postId);

      const posts = await Post.paginate(
        { _id: { $in: postsId } },
        { limit, page }
      );

      return posts;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  

  static async requestsFriends(object) {
    try {
      exits(object);
      const { userId, page, limit } = object;

      const queryOptions = {
        model: "User",
        select: ["friendsWaiting"],
      };
      const user = await isValidObjectId({ _id: userId }, queryOptions);

      if (user?.error) {
        throw new Error(user.message);
      }

      const options = {
        limit,
        page,
        select: "username _id friends ",
      };

      const userWaitingId = user?.friendsWaiting?.map((requestId) => requestId);

      const usersWainting = await User.paginate(
        { _id: { $in: userWaitingId } },
        options
      );

      return usersWainting;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async getFriendsPosts(object) {
    try {
      exits(object);
      const { userId: friendId, limit, page, currentUser } = object;
  
            // Fetch friends of the user
          const friends = await this.getFriends({ userId: friendId, limit, page });
      

          if (friends?.error) throw new Error(friends?.message);

          // Fetch hidden posts and hidden users' posts for the current user
          const postsHidden = await isValidObjectId({ _id: currentUser }, { model: "User", select: ["postsHiden", "usersPostHidden"] });
          if (postsHidden?.error) throw new Error(postsHidden?.message);

          // Fetch friends' posts excluding those from hidden users
          const friendsPostsIds = await Promise.all(
            friends.docs.map(async (friend) => {
              const hiddenUserIds = postsHidden.usersPostHidden.map((id) => id.toString());

              // If the friend is not in the hidden users list, fetch their posts
              if (!hiddenUserIds.includes(friend._id.toString())) {
                const friendPosts = await isValidObjectId(
                  { _id: friend._id.toString() },
                  { model: "User", select: ["posts"] }
                );
                if (friendPosts.error) throw new Error(friendPosts.message);
                return friendPosts.posts || [];
              } else {
                return []; // Return an empty array if the user's posts are hidden
              }
            })
          );

          // Flatten the nested arrays of friends' post IDs
          const flattenedFriendsPostsIds = friendsPostsIds.flat();

          // Convert postsHidden array to strings for comparison
          const hiddenPostIds = postsHidden.postsHiden.map((id) => id.toString());

          // Filter out hidden posts from the friends' posts list
          const filteredFriendsPosts = flattenedFriendsPostsIds.filter((id) => !hiddenPostIds.includes(id.toString()));

          // Fetch and paginate the filtered friends' posts
          const friendsPosts = await Post.paginate(
            { _id: { $in: filteredFriendsPosts } },
            { limit, page }
          );

      return friendsPosts;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async getUsersFromFriends({userId, limit, page}){
    try {

      const user = await isValidObjectId({ _id: userId }, {model: "User"});
      if(user.error) throw new Error(user.message)

      const friends = await this.getFriends({userId, limit, page, select: ["friends"]})

      if(friends.error) throw new Error(friends.message)
      
      const friendsOfFriends = friends.docs.flatMap(friend => friend.friends);
      const friendsOfFriendsSet = new Set(friendsOfFriends);

        
        const friendsUser = User.paginate({
          _id: {$in: Array.from(friendsOfFriendsSet), $ne: userId}
        }, {limit, page, select: ["username", "email", "imageProfile", "bio"]})      


      return friendsUser
      
    } catch (error) {
      return {
        error, 
        message: error.message
      }
    }
  }

  static async getSameInterestUsers({userId, limit, page}){
    try {
      const user = await isValidObjectId({ _id: userId }, {model: "User", select: ["interests"] });

      const friends = await this.getFriends({userId, limit, page, select: ["friends"]})

      if(friends.error) throw new Error(friends.message)

      if(user.error) throw new Error(user.message)
      
      
      const friendsId = friends.docs.map((friend)=> friend._id)
       
      const interestsSet = new Set(user.interests);  

      const result = await UserModel.paginate({
        _id: { $ne: userId, $nin: friendsId  }, 
        interests: { $in: [...interestsSet]},
      }, 
      {limit, page, select: ["username", "email", "imageProfile", "interests", "bio"]}
    )


    
    return result
      
    } catch (error) {
      return {
        error, 
        message: error.message
      }
    }
  }

  static async addFriend(object) {
    try {
      exits(object);

      const { userId, addUserId } = object;

      const queryOptions = {
        model: "User",
        select: ["friends", "friendsWaiting"],
      };

      const user = await isValidObjectId({ _id: userId }, queryOptions);
      const addUser = await isValidObjectId({ _id: addUserId }, queryOptions);

      if (user?.error || addUser.error) {
        throw new Error("document not found or objectId is not valid");
      }

      if (
        user.friends.includes(addUserId) ||
        user.friendsWaiting.includes(addUserId) ||
        addUser.friendsWaiting.includes(userId) ||
        addUser.friends.includes(userId)
      )
        throw new Error("you can't send twice");

      await addUser.updateOne({ $push: { friendsWaiting: userId } });
      await addUser.save();
      return;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async nearUsers(object){
    try {
      const {userId, maxDistance, lat, lng, limit, page} = object
      const user = await isValidObjectId({ _id: userId }, {model: "User"});

      const friends = await this.getFriends({userId, limit, page, select: ["friends"]})

      if(friends.error) throw new Error(friends.message)

        
      if(user.error) throw new Error(user.message)
          
      const friendsId = friends.docs.map((friend)=> friend._id)
          
      if (!lat || !lng) throw new Error('Latitude and longitude are required')


      const maxDistanceInMeters = maxDistance ? maxDistance * 1000 : 20000; 

      const query = {
        _id: { $ne: userId, $nin: friendsId }, 
        location: {
          $geoWithin: {
            $centerSphere: [[parseFloat(lng), parseFloat(lat)], maxDistanceInMeters / 6378137] // Radio en radianes
          }
        }
      };

      // Definimos las opciones de paginación
      const options = {
        page,
        limit,
        select: ['username', 'email', 'imageProfile', 'bio'], // Campos a retornar
        lean: true // Convertimos los documentos Mongoose a objetos JS planos
      };

      // Ejecutamos la consulta paginada
      const result = await User.paginate(query, options);


      return result
      

    } catch (error) {
      return {
        error, 
        message: error.message
      }
    }
  }

  static async acceptFriend(object) {
    try {
      exits(object);
      const { userId, addUserId, accept } = object;
      const acceptBoolean = accept === "true";

      const queryOptions = {
        model: "User",
        select: ["friendsWaiting", "friends"],
      };

      const user = await isValidObjectId({ _id: userId }, queryOptions);
      const addUser = await isValidObjectId({ _id: addUserId }, queryOptions);

      if (user?.error || addUser.error) {
        throw new Error("document not found or objectId is not valid");
      }

      if (!user.friendsWaiting.includes(addUserId))
        throw new Error("user is not into your friends requests");

      if (acceptBoolean) {
        if (user.friends.includes(addUserId))
          throw new Error("you already have it as a friend");
        await user.updateOne({ $pull: { friendsWaiting: addUserId } });
        await user.updateOne({ $push: { friends: addUserId } });
        await addUser.updateOne({ $push: { friends: userId } });
        return;
      }

      if (!acceptBoolean) {
        await user.updateOne({ $pull: { friendsWaiting: addUserId } });
        return;
      }

      return;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async delete(object) {
    try {
      exits(object);
      const { userId } = object;

      const options = {
        model: "User",
      };
      const user = await isValidObjectId({ _id: userId }, options);

      if (user.error) {
        throw new Error(user.message);
      }

      await User.findByIdAndDelete(userId);
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async getUsersOnline(object) {
    try {
      if (!object || !object.userId) {
        throw new Error("Missing required parameter: userId");
      }

      const { userId, limit, page } = object;
      const friends = await this.getFriends({ userId, limit, page });
      const usersOnline =
        friends?.docs?.filter((user) => user.status === "Online") ?? [];

      return usersOnline;
    } catch (error) {
      throw new Error(`Error in getUsersOnline: ${error.message}`);
    }
  }

  static async editUserLocation(object){
    try {
      if (!object || !object.userId) {
        throw new Error("Missing required parameter: userId");
      }
      const {userId, location} = object

      const user = await isValidObjectId({_id: userId}, {model: "User"})
      if(user.error) throw new Error(user.message)

     const updatedUser =  await User.findByIdAndUpdate(userId, {city: location?.city, state: location?.state, country: location?.country, workAt: location.workAt}, {new: true})
   
     return updatedUser
    } catch (error) {
      return {
        error, 
        message: error.message
      }
    }
  }

  static async uploadProfilePicture(object) {
    try {
      exits(object);
      const { userId, avatar } = object;
     
      const queryOptions = {
        model: "User",
      };

      
      if (!avatar) {
        throw new Error("file invalidate or undefined");
      }

      const user = await isValidObjectId({ _id: userId }, queryOptions);
      if (user?.error) {
        throw new Error(user?.message);
      }

   
      const result = await cloudinaryService.upload({
        filePath: avatar?.tempFilePath,
      });

      
      await fs.remove(avatar?.tempFilePath);
      const ProfilePicture = {
        url: result.url,
        public_id: result.public_id,
      };

      if(user.imageProfile) await cloudinaryService.deleteImage({imageId: user.imageProfile.public_id})

      user.imageProfile = ProfilePicture;

      await user.save();
      return null;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async uploadCoverPicture(object){
    try {
      exits(object)
      const {userId, coverPicture} = object
    
      if (!coverPicture) {
        throw new Error("file invalidate or undefined");
      }

      const user = await isValidObjectId({ _id: userId }, { model: "User" } );
      if (user?.error) {
        throw new Error(user?.message);
      }

      const cover = await  cloudinaryService.upload({
        filePath: coverPicture.tempFilePath
     
      })
      
      if(cover.error) throw new Error(cover.message)

      const urls = await cloudinaryService.getImageUrls({public_id: cover.public_id})
      console.log(urls)
           
      if(urls.error) throw new Error(urls.error.message)

      const ProfilePicture = {
        url: urls.url,
        public_id: urls.public_id,
        previewUrl: urls.previewUrl
      };

      if(user.coverPicture) await cloudinaryService.deleteImage({imageId: user.coverPicture.public_id})

      
      const updatedUser = await UserModel.findByIdAndUpdate(userId, {coverPicture: ProfilePicture}, {new: true})

      return updatedUser.coverPicture
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  

  static async editProfilePictureFromImages(object){
    try {
      exits(object)
      const {userId, objectImage} = object
      
      const user = await isValidObjectId({ _id: userId }, {model:"User", select:["imageProfile"]});

      if (user?.error) {
        throw new Error(user?.message);
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { imageProfile: objectImage },
        { new: true }
      );

      return updatedUser.imageProfile;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async editCoverPicture(object){
    try {
      exits(object)
      const {userId, objectImage} = object
      
      const user = await isValidObjectId({ _id: userId }, {model:"User", select:["coverPicture"]});

      if (user?.error) {
        throw new Error(user?.message);
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { coverPicture: objectImage },
        { new: true }
      );

      return updatedUser.coverPicture;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async updateInfo(object) {
    try {
      exits(object);
      const { userId, userInfo } = object;

     

      const options = {
        model: "User",
      };

      const user = await isValidObjectId({ _id: userId }, options);

      if (user?.error) {
        throw new Error(user?.message);
      }
      

      const userUpdatd = await UserModel.findByIdAndUpdate(user._id, {...userInfo}, {new : true});

      return userUpdatd;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async hidePost(object) {
    try {
      exits(object);
  
      const { userId, postId } = object;
      const user = await isValidObjectId({ _id: userId }, { model: "User" });
      const post = await isValidObjectId({ _id: postId }, { model: "Post" });
  
      if (user.error || post.error) throw new Error("something went wrong");
  
      if (Array.isArray(user.postsHiden) && !user.postsHiden.includes(postId)) {
       
         await UserModel.findByIdAndUpdate(
          user._id,
          { $addToSet: { postsHiden: postId } },
          { new: true } 
        );
        return { message: "The post has been hidden" };
      } 

      return { message: "post already includes" };
      
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async hideAllPosts(object){
    try {
      exits(object)
      const {userId, userIdToHide} = object

      const queryOptions = {
        model: "User",
        
      };

      const user = await isValidObjectId({ _id: userId }, queryOptions);
      const userToHide = await isValidObjectId({ _id: userIdToHide }, queryOptions);

      if (user?.error) throw new Error(user?.message);
      if (userToHide?.error) throw new Error(user?.message);

      

      if(Array.isArray(user.usersPostHidden) && !user.usersPostHidden.includes(userToHide)){

        await UserModel.findByIdAndUpdate(
          user._id, 
         { $addToSet: {usersPostHidden: userToHide } }, 
         {new: true}
        )

        return {message: "user added"}
      }
      else {
        return {message: "user not added"}
      }
      

        
      
    } catch (error) {
      return {
        error, 
        message: error.message
      }
    }
  }

  static async report(object) {
    try {
      exits(object);
  
      const LIMIT_REPORTS_POST = 30;
      const { userId, postId } = object;

     
  
      // Fetch user and post with necessary fields
      const user = await isValidObjectId({ _id: userId }, { model: "User" });
      const post = await isValidObjectId({ _id: postId }, { model: "Post" });

      
  
      if (user.error || post.error) throw new Error("Something went wrong");
  
      // Ensure post.reports is an array
      if (!Array.isArray(post.reports)) {
        return { message: "The post reports are not properly defined." };
      }
  
      // Check if the user has already reported the post
      if (!post.reports.includes(userId)) {
        // Check if the reports exceed the limit
        if (post.reports.length >= LIMIT_REPORTS_POST) {
          await Post.findByIdAndDelete(postId);
          return { message: "The post has been deleted due to excessive reports." };
        }
  
        // Add the user's report to the post
        await Post.findByIdAndUpdate(
          postId,
          { $addToSet: { reports: userId } },
          { new: true }
        );
  
        return { message: "The post has been reported." };
      } else {
        return { message: "You have already reported this post." };
      }
  
    } catch (error) {
      return {
        error,
        message: error.message
      };
    }
  }

  static async unFollow  (object) {
    try {
      // Validar la entrada
      exits(object);
  
      const { userId, friendId } = object;
  
      // Verificar que los IDs sean válidos y obtener los datos del usuario
      const user = await isValidObjectId({ _id: userId }, { model: "User", select: ["friends"] });
      const friend = await isValidObjectId({ _id: friendId }, { model: "User" });
  
      if (user.error || friend.error) throw new Error("Something went wrong");
  
      // Asegurarse de que la lista de amigos es un array
      if (!Array.isArray(user.friends)) {
        return { message: "Friends is not an array" };
      }
  
      // Verificar si el amigo está en la lista de amigos del usuario
      if (user.friends.includes(friendId)) {
        // Eliminar el amigo de la lista de amigos del usuario
        await UserModel.findByIdAndUpdate(userId, {
          $pull: { friends: friendId },
        });

        await UserModel.findByIdAndUpdate(friendId, {
          $pull: { friends: userId },
        });
        
  
        return { message: "Successfully unfollowed the friend" };
      } else {
        return { message: "Friend not found in user's friends list" };
      }
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  };
  
  static async getPhotos(object){
    try {
      exits(object)
      const {userId, limit, page} = object
      const user = await isValidObjectId({ _id: userId }, { model: "User", select: ["posts"] });
      
      if (user?.error) {
        throw new Error(user?.message);
      }

      const posts = await this.getPosts({userId, limit: 99999, page: 1})
      
      if(posts.error) throw new Error(posts.message)
    
        const images = posts.docs
        .filter((post) => {
          return !post.hasOwnProperty('image')
        }).map((post)=> post.image)
       
        
        const filteredImages = images.filter(obj => JSON.stringify(obj) !== '{}');
    
       
      return filteredImages

    } catch (error) {
      return {
        error, 
        messag: error.message
      }
    }
  }
};
