const { Router } = require("express");
const getNotifications = require("../application/getNotifications");
const createNotification = require("../application/createNotifications");
const route = Router();
const webPush = require("../webPush/webPush");
const subscription = require("../webPush/subscription");
const sendNotification = require("../webPush/sendNotification");

route.get("/:userId", getNotifications);

route.post("/", createNotification);

route.post("/subscription", subscription);

route.post("/send", sendNotification);

module.exports = route;
