const createImagen = require("../Post/application/createPost/createImagen");
const cloudinaryService = require("../libs/cloudynary");
const exits = require("../libs/exits");
const isValidObjectId = require("../libs/isValidObjectId");

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

  static async create(object) {
    try {
      exits(object);
      const { from, message, to, conversationId, reply, file } = object;
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
};
