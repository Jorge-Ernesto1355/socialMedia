const NotificationService = require("../NotificationService");
const validateNotification = require("../validations/NotificationSchema");

const createNotification = async (req, res) => {
  // const {label, userConector, userReceptor, message} = req.body
  const result = validateNotification(req.body);
  if (result.error) {
    return res.status(400).json({ error: result.error.message });
  }

  const notification = await NotificationService.create(req.body);

  if (notification.error) {
    return res.status(400).json({ error: notification.error.mesasge });
  }

  res.status(201).json({ message: "notificationCreated" });
};

module.exports = createNotification;
