const Notification = require("./domain/Notification");

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
        { userReceptor: userId },
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
    // {
    //     label,
    //     userReceptor,
    //     message,
    //     userConector,
    //   }

    if (!objectCreate)
      return {
        error: "not parameteres found to method create",
      };

    try {
      const notification = await new Notification(objectCreate);
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
