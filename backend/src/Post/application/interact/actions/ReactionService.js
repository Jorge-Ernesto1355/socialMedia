const exists = require("../../../../libs/exits");
const validateObjectId = require("../../../../libs/isValidObjectId");
const UserModel = require("../../../../users/domain/UserModel");
const Post = require("../../../dominio/Post");
const Reaction = require("../../../dominio/Reaction");

module.exports = class ReactionService {
  static async create(object) {
    exists(object);

    const {
      label,
      user: { userId },
      value,
      postId,
    } = object;

    try {
      const isValidUser = validateObjectId(userId, UserModel);
      const isValidPost = validateObjectId(postId, Post);

      if (isValidPost?.error || isValidUser?.error) {
        throw new Error("document not found or objectId is not valid");
      }

      const post = await Post.findById(id).populate([
        "reactions.gusta",
        "reactions.encanta",
        "reactions.divierte",
        "reactions.asombra",
        "reactions.entristece",
      ]);
      const user = await UserModel.findById(userId);

      const reaction = await new Reaction({
        label,
        value,
        user: {
          userId,
          username: user.username,
          imageProfile: {
            url: user.imageProfile.url,
            public_id: user.imageProfile.public_id,
          },
        },
      });
      const reactionSaved = await reaction.save();
      post.reactions[label] = [...post.reactions[label], reactionSaved];
      await post.save();
    } catch (error) {}
  }

  static async ExistsReaction(object) {
    exits(object);

    const { containerId, modelContainer } = object;

    let reactions = [];

    //para saber si esta el user o no
    let exits = false;

    //para saber si debemos eliminar y crear o no hacer nada
    let reactionLabel = "";

    //para actualizar el action
    let reactionId = null;

    try {
      const isValidPost = await validateObjectId(containerId, modelContainer);
      if (isValidPost?.error) {
        throw new Error(isValidPost.message);
      }
    } catch (error) {}
  }
};
