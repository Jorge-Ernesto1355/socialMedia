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
    //userId is the id to the userReceptor notifications

    const options = {
      limit,
      page,
      sort: { date: -1 },
    };

    try {
      const notifications = await Notification.paginate(
        { "userReceptor.userId": userId },
        options
      );

      if (notifications) return notifications;

      if (!notifications) return {};
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

      const { label, message, userConnectorId, userReceptorId } = objectCreate;
      const options = {
        model: "User",
        select: ["username", "_id", "imageProfile"],
      };

      const userReceptor = await isValidObjectId(
        { _id: userReceptorId },
        options
      );
      const userConnector = await isValidObjectId(
        { _id: userConnectorId },
        options
      );

      if (userReceptor.error || userConnector.error) {
        throw new Error("document not found or objecdtId is not valid");
      }

      const notification = await new Notification({
        userReceptor: {
          username: userReceptor.username,
          userId: userReceptor._id,
          imageProfile: userReceptor.imageProfile,
        },
        userConnector: {
          username: userConnector.username,
          userId: userConnector._id,
          imageProfile: userConnector.imageProfile,
        },
        message,
        label,
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
