const NotificationService = require("../NotificationService");

const getNotifications = async (req, res) => {
  const { userId } = req.params;
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;

  if (!userId) return res.status(500).json({ message: "something went wrong" });

  const notifications = await NotificationService.getAll({
    userId,
    page,
    limit,
  });
  console.log(notifications);
  if (notifications.error)
    return res.status(500).json({ message: notifications.error.message });

  return res.status(200).json(notifications);
};

module.exports = getNotifications;
