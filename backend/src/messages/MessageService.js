const cloudinaryService = require("../libs/cloudynary");
const exits = require("../libs/exits");
const isValidObjectId = require("../libs/isValidObjectId");
const userService = require("../users/userService");

const Message = require("./domain/Message");
const { validateMessage } = require("./utils/validate/Message/MessageShema");

module.exports = class MessageService {
  static async messages(object) {
    try {
      exits(object);
      const { conversationId, limit, page } = object;
      const queryOptions = {
        model: "Conversation",
      };
      const conversation = await isValidObjectId(
        { _id: conversationId },
        queryOptions
      );

      if (conversation.error) throw new Error("something went wrong");

      const messages = await Message.find({ conversationId });

      const messagesIds = messages?.map((message) => message?._id);

      const messagesPagination = await Message.paginate(
        { _id: { $in: messagesIds } },
        { limit, page, sort: { createdAt: "desc" } }
      );

      return messagesPagination;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async messageWithOutPagination(object) {
    try {
      exits(object);
      const { conversationId } = object;
      const queryOptions = {
        model: "Conversation",
      };
      const conversation = await isValidObjectId(
        { _id: conversationId },
        queryOptions
      );
      if (conversation.error) throw new Error("something went wrong");
    } catch (error) {}
  }

  static async create(object) {
    try {
      exits(object);
      const { from, message, to, conversationId, reply, file, postId } = object;
      const result = validateMessage({ from, message, to });

      if (result.error) {
        throw new Error(result.error.message);
      }

      const image = await cloudinaryService.upload({
        filePath: file?.tempFilePath,
      });

      if (image?.error)
        throw new Error("something went wrong to upload the photo");

      const ReplyValue = reply === "null" ? undefined : reply;

      const newMessage = await Message.create({
        from,
        text: message,
        to,
        postId,
        conversationId,
        reply: ReplyValue,
        file: image,
      });
      return newMessage.save();
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
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async unReadMessage(object) {
    try {
      exits(object);
      const { conversationId, userId } = object;
      const queryOptions = {
        model: "Conversation",
      };

      const conversation = await isValidObjectId(
        { _id: conversationId },
        queryOptions
      );

      if (conversation.error) throw new Error("something went wrong");

      const messagesUnRead = await Message.find({
        conversationId,
        $and: [{ to: userId }, { readBy: { $size: 0 } }],
      });

      return { unRead: messagesUnRead?.length };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async message(object) {
    try {
      exits(object);
      const { messageId } = object;

      const message = await isValidObjectId(
        { _id: messageId },
        { model: "Message" }
      );

      if (message.error) throw new Error(message.message);
      return message;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async read(object) {
    try {
      exits(object);
      const { conversationId, userId } = object;
      const queryOptions = {
        model: "Conversation",
      };

      const conversation = await isValidObjectId(
        { _id: conversationId },
        queryOptions
      );

      if (conversation.error) throw new Error("something went wrong");

      const result = await Message.updateMany(
        {
          conversationId,
          to: userId,
          readBy: { $size: 0 },
        },
        {
          $set: { readBy: [userId] },
        }
      );

      return result;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async sendToAll(object) {
    try {
      const { userId, friends, message } = object;

      const user = await userService.get({ userId });
      if (user?.error) throw new Error("user is not valid");

      const sendToAll = await Promise.all(
        await friends?.map(async (friendId) => {
          const friend = await userService.get({ userId: friendId });
          if (friend?.error) throw new Error(friend?.message);
          const conversation = await isValidObjectId(
            {
              participants: {
                $size: 2,
                $all: [friendId, userId],
              },
            },
            { model: "Conversation", select: ["_id"] }
          );

          if (conversation?.error) {
            throw new Error(conversation?.message);
          }

          if (conversation?.error) throw new Error(conversation?.message);

          const Createmessage = await this.create({
            from: userId,
            to: friendId,
            message,
            conversationId: conversation?._id,
          });

          return Createmessage;
        })
      );

      return sendToAll;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
};
