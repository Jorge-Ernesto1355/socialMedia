const exits = require("../libs/exits");
const Notification = require("./domain/Notification");
const isValidObjectId = require("../libs/isValidObjectId");

class NotificationService {
  static async getAll(objectGet) {
    if (!objectGet)
      return {
        error: "not parameters found to method get",
      };

    const { limit, page, userId } = objectGet;

    const options = {
      limit,
      page,
      sort: { date: -1 },
      populate: [
        {path: "containerId",  select:["description","comment.text"]}, 
        {path: "sender", select: ["username", "imageProfile"]}, 
        {path: "receiver", select: ["username", "imageProfile"]}
      ], 
      
    };

    try {
      const notifications = await Notification.paginate(
        { receiver: userId },
        options
      );

     return notifications;

      
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
  static async create(objectCreate) {
    try {
      exits(objectCreate);

      const { type, message, senderId, receiverId, containerId, containerModel} = objectCreate;
      const options = {
        model: "User",
        select: ["username", "_id", "imageProfile"],
      };
     

      let container = null
      if(containerId) container = await isValidObjectId({_id: containerId}, {model:containerModel})
       
      if(container?.error) throw new Error(container?.message)

      const receiver = await isValidObjectId(
        { _id: receiverId },
        options
      );
      const sender = await isValidObjectId(
        { _id: senderId },
        options
      );

      if (receiver.error || sender.error ) {
        throw new Error("document not found or id is not valid");
      }

      const notification = await new Notification({
        sender: sender._id, 
        receiver: receiver._id,
        message,
        containerId: container?._id ?? null,
        containerModel,
        type,
      });
      await notification.save();
      return notification;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
}

module.exports = NotificationService;
