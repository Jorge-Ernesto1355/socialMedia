const { DocumentNotFound } = require("../handleErros/errors");
const exits = require("../libs/exits");
const isValidObjectId = require("../libs/isValidObjectId");
const Conversation = require("./domain/Conversation");
const Message = require("./domain/Message");

module.exports = class ConversationService {
  static async conversations(object) {
    try {
      exits(object);

      const { userId, limit, page } = object;

      const options = {
        limit,
        page,
        populate: ["participants"],
      };

      const user = await isValidObjectId({ _id: userId }, { model: "User" });

      if (user?.error) throw new Error(user?.message);

      const conversations = await Conversation.paginate(
        {
          participants: {
            $all: [userId],
          },
        },
        options
      );

      return conversations;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async conversation(object) {
    try {
      exits(object);
      const { to, from } = object;
      const queryOptions = {
        model: "Conversation",
      };

      const conversation = await isValidObjectId(
        {
          participants: {
            $size: 2,
            $all: [to, from],
          },
        },
        queryOptions
      );

      if (conversation?.error) {
        if (conversation.error instanceof DocumentNotFound) {
          const newConversation = await this.create({ to, from });
          return await newConversation.save();
        }
        throw new Error(conversation?.message);
      }

      return conversation;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async UnReadMessages(object) {
    try {
      exits(object);
      const { conversationId, friendId } = object;

      const conversation = await isValidObjectId(
        { _id: conversationId },
        { model: "Conversation", select: ["messages"] }
      );

      if (conversation?.error) throw new Error(conversation?.message);

      const notReadMessages = await Message.find({
        to: friendId,
        isRead: false,
      }).select(["_id"]);

      return notReadMessages;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async create(object) {
    try {
      exits(object);

      const { to, from } = object;

      const conversation = await Conversation.create({
        participants: [to, from],
      });
      return conversation;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
};
