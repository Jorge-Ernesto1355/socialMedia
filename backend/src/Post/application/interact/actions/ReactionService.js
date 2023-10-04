const exists = require("../../../../libs/exits");
const validateObjectId = require("../../../../libs/isValidObjectId");
const UserModel = require("../../../../users/domain/UserModel");
const Post = require("../../../dominio/Post");
const Reaction = require("../../../dominio/Reaction");
const verifyExistingUser = require("./utils/verifyExistingUser");
 

module.exports = class ReactionService {
  static async create(object) {
    exists(object);

    const {
      label,
      userId,
      value,
      postId,
    } = object;

    try {
      const isValidUser = validateObjectId(userId, UserModel);
      const isValidPost = validateObjectId(postId, Post);

      if (isValidPost?.error || isValidUser?.error) {
        throw new Error("document not found or objectId is not valid");
      }

      const {reactions} = await Post.findById(id).populate([
        "reactions.gusta",
        "reactions.encanta",
        "reactions.divierte",
        "reactions.asombra",
        "reactions.entristece",
      ]);
      
      const user = await UserModel.findById(userId);

      const {exitsUserId, reaction} = verifyExistingUser(reactions, userId)
      
      if(!exitsUserId){
          return await this.createReaction({label, value, user, userId})
      } 
      if(exitsUserId){
          if(reaction?.label === label ) return 
          await Reaction.findByIdAndDelete(reaction._id)
         return  await this.createReaction({label, value, user, userId, postId})
      }    
       
      
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

static async createReaction({label, value, user, userId, postId}){

  const isValidPost = validateObjectId(postId, Post);

  if (isValidPost?.error || isValidUser?.error) {
    throw new Error("document not found or objectId is not valid");
  }

  const {reactions} = await Post.findById(postId);

    try {
      const reaction = await new Reaction({
        label,
        value,
        user: {
          userId,
          username: user?.username,
          imageProfile: {
            url: user?.imageProfile?.url,
            public_id: user?.imageProfile?.public_id,
          },
        },
      });
      
      const reactionSaved = await reaction.save();
      reactions[label] = [...reactions[label], reactionSaved];
      await reactions.save();
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }

  }

 
};
