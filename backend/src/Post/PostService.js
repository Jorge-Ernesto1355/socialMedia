const UserModel = require("../users/domain/UserModel");
const createImagen = require("./application/createPost/createImagen");
const createVotes = require("./application/createPost/createVotes");
const Post = require('./dominio/Post')
function exits(object) {
  if (!object) throw new Error("not found parameters");
}

class PostService {

  static async getAll(object){

    exits(object)

    const {limit, page} = object

    try {
      return await Post.paginate({}, { limit, page });
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }

  }

  static async create(req) {
    exits(req.body);
  
    const { description, userId, votes, postShared, usersTagged } = req.body
  
    let image = null;
    try {
      image = await createImagen(req);
      votes > 0 && (await createVotes({votes}));
      const user = await UserModel.findById(userId)
  
      const newPost = new Post({ userId, description, image });
      if (postShared) newPost.postShared = postShared;
      user.posts = [...user.posts, newPost]
      await user.save();
      const postsaved = await newPost.save();
      return postsaved

    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
  
}

module.exports = PostService

