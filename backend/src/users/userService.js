const exits = require("../libs/exits");
const isValidObjectId = require("../libs/isValidObjectId");
const User = require("./domain/UserModel");
const Post = require("../Post/dominio/Post");
const fs = require("fs-extra");

const { default: mongoose } = require("mongoose");
const { uploadImage } = require("../libs/cloudynary");
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

      const { userId } = object;

      const user = await isValidObjectId({ userId }, "User");

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

      const user = await isValidObjectId({ userId }, "User");

      if (user.error) {
        throw new Error(user.message);
      }

      const options = {
        limit,
        page,
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

      const user = await isValidObjectId({ userId }, "User");

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
      const user = await isValidObjectId({ userId }, "User");

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

  static async addFriend(object) {
    try {
      exits(object);

      const { userId, addUserId } = object;

      const user = await isValidObjectId({ userId }, "User");
      const addUser = await isValidObjectId({ userId: addUserId }, "User");

      if (user?.error || addUser.error) {
        throw new Error("document not found or objectId is not valid");
      }

      if (user.friends.includes(addUserId))
        throw new Error("you can't send twice");
      await user.updateOne({ $push: { friendsWaiting: addUserId } });
      await user.save();
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

      const user = await isValidObjectId({ userId }, "User");
      const addUser = await isValidObjectId({ userId: addUserId }, "User");

      if (user?.error || addUser.error) {
        throw new Error("document not found or objectId is not valid");
      }

      if (!user.friendsWaiting.includes(addUserId))
        throw new Error("user is not into your friends requests");

      if (acceptBoolean) {
        await user.updateOne({ $pull: { friendsWaiting: addUserId } });
        await user.updateOne({ $push: { friends: addUserId } });
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
      const user = await isValidObjectId({ userId }, "User");

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
};
