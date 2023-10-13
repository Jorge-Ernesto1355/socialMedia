const UserModel = require("../users/domain/UserModel");
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
      const { objectId } = object;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async create(req) {
    exits(req.body);

    const { description, userId, votes, postShared, usersTagged } = req.body;
    console.log(usersTagged);
    let image = null;
    try {
      image = await createImagen(req);
      votes > 0 && (await createVotes({ votes }));
      const user = await UserModel.findById(userId);

      const newPost = new Post({ userId, description, image });
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
      const { postId, text } = object;
      const isValidPost = await validateObjectId(postId, "Post");

      if (isValidPost?.error) {
        throw new Error(isValidPost?.error?.message);
      }

      const update = await Post.findAndUpdate(postId, { text });
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
      const isValidPost = await validateObjectId(postId, "Post");

      if (isValidPost?.error) {
        throw new Error(isValidPost?.error?.message);
      }

      await Post.findByIdAndDelete(postId);
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
}

module.exports = PostService;
