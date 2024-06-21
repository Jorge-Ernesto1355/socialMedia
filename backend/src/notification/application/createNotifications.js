const NotificationService = require("../NotificationService");
const validateNotification = require("../validations/NotificationSchema");

const createNotification = async (req, res) => {
  
  const result = validateNotification(req.body);

  if (result.error) {
    return res.status(400).json({ error: result.error.message });
  }

  const { message, type, senderId, receiverId, containerId, containerModel} = req.body;

  const notification = await NotificationService.create({
    message,
    type,
    senderId,
    receiverId,
    containerId, 
    containerModel
  });

  if (notification.error) {
    return res.status(500).json({ error: notification.message });
  }

  res.status(201).json(notification);
};

module.exports = createNotification;
