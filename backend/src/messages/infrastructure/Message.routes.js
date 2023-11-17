const { Router } = require("express");
const index = require("../Messages/index");
const router = Router();

router.get("/all/:conversationId", index.query.messages);

router.get("/:messageId", index.query.message);

router.post("/", index.mutation.createMessage);

router.delete("/", index.mutation.deleteMessage);

router.put("/", index.mutation.updateMessage);

module.exports = router;
