const { isValid } = require("zod");
const cloudinaryService = require("../libs/cloudynary");
const isValidObjectId = require("../libs/isValidObjectId");
const getTotalPoints = require("../reaction/utils/getTotalPoints");
const { exists } = require("../users/domain/UserModel");
const userService = require("../users/userService");
const createImagen = require("./application/createPost/createImagen");
const createVotes = require("./application/createPost/createVotes");
const Post = require("./dominio/Post");
function exits(object) {
  if (!object) throw new Error("not found parameters");
}

class PostService {
  static async getAll(object) {
    exits(object);

    const { limit, page } = object;

    try {
      return await Post.paginate({}, { limit, page });
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
      const { postId } = object;
      const isValidPost = await validateObjectId(postId, "Post");

      if (isValidPost?.error) {
        throw new Error(isValidPost?.error?.message);
      }

      const Post = await Post.findById(postId);
      return Post;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async getTimeLine(object) {
    try {
      exits(object);
      const { userId, limit, page } = object;

      const userPosts = await userService.getPosts({ userId, limit, page });

      if (userPosts?.error) {
        throw new Error(userPosts.message);
      }

      const friendPosts = await userService.getFriendsPosts({
        userId,
        limit,
        page,
      });
      if (friendPosts?.error) {
        throw new Error(friendPosts?.message);
      }

      const options = {
        limit,
        page,
      };

      const currentUserAndFriendsPosts =
        Array.prototype.concat.apply(userPosts?.docs, friendPosts?.docs) ?? [];

      const idsPosts = currentUserAndFriendsPosts.map(
        (currentPost) => currentPost?._id
      );

      const results = await Post.paginate({ _id: { $in: idsPosts } }, options);

      const postsWithTotalPoints = await Promise.all(
        results?.docs?.map(async (currentPost) => {
          const totalPoints = await getTotalPoints(currentPost?.reactions);

          if (totalPoints?.error) {
            throw new Error(totalPoints?.message);
          }

          if (typeof totalPoints === "number") {
            currentPost.points = totalPoints;
          }

          return currentPost;
        })
      );

      const orderedPosts = postsWithTotalPoints.sort(
        (a, b) => b?.points - a?.points
      );

      results.docs = orderedPosts;

      return results;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async create(req) {
    exits(req.body);

    const {
      description,
      userId,
      votes,
      postShared,
      usersTagged,
      timeExpiration,
    } = req.body;
    const queryOptions = {
      model: "User",
      select: ["posts"],
    };

    try {
      const file = req.files?.image;
      const image = await cloudinaryService.upload({
        filePath: file?.tempFilePath,
      });

      if (image?.error)
        throw new Error("something went wrong to upload the photo");

      votes > 0 && (await createVotes({ votes }));
      const user = await isValidObjectId({ _id: userId }, queryOptions);
      console.log(timeExpiration);
      const newPost = new Post({
        userId,
        description,
        image,
        expiresIn: timeExpiration ? timeExpiration : undefined,
      });
      if (postShared) newPost.postShared = postShared;
      newPost.usersTagged = usersTagged?.map((username) => ({
        username,
      }));
      user.posts = [...user.posts, newPost];
      await user.save();
      const postsaved = await newPost.save();

      return postsaved;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async update(object) {
    try {
      exits(object);
      const { postId, description, userId } = object;
      const queryOptions = {
        model: "Post",
      };

      const post = await isValidObjectId({ _id: postId }, queryOptions);

      if (post?.error) {
        throw new Error(post?.message);
      }

      if (!(userId == post?.userId))
        throw new Error("your not the owner of this post");
      const update = await Post.findByIdAndUpdate(postId, {
        description,
      });
      return update;
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
      const { postId } = object;
      const queryOptions = {
        model: "Post",
      };

      const isValidPost = await isValidObjectId({ _id: postId }, queryOptions);

      if (isValidPost?.error) {
        throw new Error(isValidPost?.error?.message);
      }

      await Post.findByIdAndDelete(postId);

      return null;

      // if(userShared){

      //   try {
      //     if(!post.shares.includes(userShared)){
      //       return res.status(200).json({message:"se ha borrado"})
      //     }else{

      //       await post.UpdateOne({$pull:{shares: userShared}})
      //       await user.UpdateOne({$pull:{posts:post}})

      //       await post.save()
      //       await user.save()
      //     }
      //   } catch (error) {
      //      return res.status(500).json({message:"recursos no coinciden"})
      //   }
      // }
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async editTimeExpire(object) {
    try {
      exits(object);
      const { timeExpiration, userId, postId } = object;
      console.log(timeExpiration, userId, postId);

      const user = await isValidObjectId(
        { _id: userId },
        { model: "User", select: ["username"] }
      );
      if (user?.error) throw new Error("user is not valid");

      const post = await isValidObjectId(
        { _id: postId },
        { model: "Post", select: ["expiresIn"] }
      );
      if (post?.error) throw new Error("post is not valid");

      await Post.findByIdAndUpdate(postId, { ExpiresIn: timeExpiration });

      return { message: "time expiration has been updated" };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
}

module.exports = PostService;
