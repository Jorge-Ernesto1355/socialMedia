const { default: mongoose } = require("mongoose");
const exists = require("../../../../libs/exits");
const validateObjectId = require("../../../../libs/isValidObjectId");
const Reaction = require("../../../dominio/Reaction");
const verifyExistingUser = require("./utils/verifyExistingUser");

module.exports = class ReactionService {
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
      if (!container && !container.reactions)
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
