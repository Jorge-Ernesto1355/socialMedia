const { Router } = require("express");
const index = require("../Conversations/index");
const router = Router();

router.get("/", index.query.getConversations);

router.post("/", index.mutation.Conversation);

module.exports = router;
