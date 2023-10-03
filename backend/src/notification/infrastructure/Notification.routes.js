const { Router } = require("express");
const getNotifications = require("../application/getNotifications");
const createNotification = require("../application/createNotifications");
const route = Router();

route.get("/:userId", getNotifications);

route.post("/", createNotification);

module.exports = route;
