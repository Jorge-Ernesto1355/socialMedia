const exits = require("../libs/exits");
const isValidObjectId = require("../libs/isValidObjectId");
const User = require("./domain/UserModel");
const Post = require("../Post/dominio/Post");
const fs = require("fs-extra");
const { default: mongoose } = require("mongoose");
const cloudinaryService = require("../libs/cloudynary");
const { comparePassword } = require("../auth/application/auth");
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

      const { userId, options = [] } = object;

      const queryOptions = {
        model: "User",
        select: [
          "username",
          "email",
          "imageProfile",
          "socketId",
          "status",
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
      const { userId, limit, page } = object;
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
        select: ["username", "email", "imageProfile", "status", "socketId"],
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
      console;
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

  static async uploadProfilePicture(object) {
    try {
      exits(object);
      const { userId, image } = object;
      const queryOptions = {
        model: "User",
      };

      if (!image) {
        throw new Error("file invalidate or undefined");
      }

      const user = await isValidObjectId({ _id: userId }, queryOptions);
      if (user?.error) {
        throw new Error(user?.message);
      }

      const result = await cloudinaryService.upload({
        filePath: image?.filePath,
      });
      await fs.remove(image.tempFilePath);
      const ProfilePicture = {
        url: result.secure_url,
        public_id: result.public_id,
      };

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

  static async updateInfo(object) {
    try {
      exits(object);
      const { password, userId } = object;

      const options = {
        model: "User",
      };
      const user = await isValidObjectId({ _id: userId }, options);

      if (user?.error) {
        throw new Error(user?.message);
      }

      const correctPassword = await comparePassword(password, user.password);

      if (!correctPassword) throw new Error("password is not correct");

      const userUpdatd = await UserModel.findByIdAndUpdate(user._id, {});

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
  
  
};
