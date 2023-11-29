const { Router } = require("express");
const index = require("../Messages/index");
const router = Router();

router.get("/all/:conversationId", index.query.messages);

router.get("/:messageId", index.query.message);

router.get("/unRead/:conversationId", index.query.unRead);

router.put("/read/:conversationId", index.mutation.markAsRead);

router.get("/lastMessage/:conversationId", index.query.lastMessage);

router.post("/", index.mutation.createMessage);

router.delete("/", index.mutation.deleteMessage);

router.put("/", index.mutation.updateMessage);

module.exports = router;
