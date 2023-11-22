const { Router } = require("express");
const index = require("../Conversations/index");
const router = Router();

router.get("/all/:userId", index.query.getConversations);

router.post("/", index.mutation.Conversation);

router.get("/one/:conversationId", index.query.getConversation);

router.put("/block/:conversationId", index.mutation.blockContact);

module.exports = router;
