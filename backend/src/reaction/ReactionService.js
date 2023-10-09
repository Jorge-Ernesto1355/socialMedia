const { default: mongoose } = require("mongoose");
const exists = require("../libs/exits");
const validateObjectId = require("../libs/isValidObjectId");
const Reaction = require("./domain/Reaction");
const verifyExistingUser = require("./utils/verifyExistingUser");
const exits = require("../libs/exits");
const groupReactions = require("./utils/groupReactions");

module.exports = class ReactionService {
  static async getAll(object) {
    try {
      exits(object);
      const { containerId, type, limit, page } = object;

      const isValidContainerId = await validateObjectId(containerId, type);

      if (isValidContainerId?.error) {
        throw new Error(isValidContainerId.message);
      }

      const options = {
        limit,
        page,
      };

      const reactions = await Reaction.paginate({ containerId }, options);

      return reactions;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
}

  static async get(object) {
    try {
      exists(object);

      const {containerId, type, label, limit, page} = object 
      const isValidContainerId = await validateObjectId(containerId, type);

      if (isValidContainerId?.error) {
        throw new Error(isValidContainerId.message);
      }

      const options = {
        limit,
        page,
      };
  

      const reactions = await Reaction.paginate({containerId, label}, {options})
      return reactions
      
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }

    
  }

  static async create(object) {
    exists(object);

    const { label, userId, value, containerId, type } = object;

    try {
      const isValidUser = await validateObjectId(userId, "User");
      const isValidContainerId = await validateObjectId(containerId, type);

      if (isValidContainerId?.error || isValidUser?.error) {
        throw new Error("document not found or objectId is not valid");
      }

      const container = await mongoose.models[type].findById(containerId);

      const reactions = (await Reaction.find({ containerId })) || [];

      const user = await mongoose.models["User"].findById(userId);

      const { exitsUserId, reaction, error } = verifyExistingUser(
        reactions,
        userId
      );

      if (error) {
        throw new Error(error.message);
      }

      if (!exitsUserId) {
        return await this.createReaction({
          label,
          value,
          user,
          userId,
          containerId,
          type,
        });
      }
      if (exitsUserId && reaction) {
        if (reaction?.label === label)
          throw new Error("same label not modified");

        const reactionSaved = await Reaction.findByIdAndUpdate(reaction._id, {
          label,
          value,
        });
        const reactionIndex = container.reactions.findIndex(
          (reactionIndex) => reactionIndex._id === reaction._id
        );
        container.reactions[reactionIndex] = reactionSaved;
        await container.save();
        return reactionSaved;
      }
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async createReaction({
    label,
    value,
    user,
    userId,
    containerId,
    type,
  }) {
    try {
      const isValidContainerId = await validateObjectId(containerId, type);

      if (isValidContainerId?.error) {
        throw new Error("document not found or objectId is not valid");
      }

      const container = await mongoose.models[type].findById(containerId);

      const reaction = await new Reaction({
        label,
        value,
        containerId,
        type,
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
      if (!container && !isArray(container.reactions))
        throw new Error("reactions Model not found");
     
      container.reactions = [...container.reactions, reactionSaved];
      await container.save();
      return reaction;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
};
