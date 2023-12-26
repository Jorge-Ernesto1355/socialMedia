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
      const { userId, limit, page } = object;

      const friends = await this.getFriends({ userId, limit, page });

      if (friends.error) throw new Error(friends.message);

      const friendsPostsIds = await Promise.all(
        await friends?.docs?.map(async (friend) => {
          const friendPost = await isValidObjectId(
            { _id: friend?._id.toString() },
            { model: "User", select: ["posts"] }
          );
          if (friendPost.error) throw new Error(friendPost.message);
          return friend?.posts;
        })
      );

      const friendsPosts = await Post.paginate(
        { _id: { $in: friendsPostsIds } },
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
};
