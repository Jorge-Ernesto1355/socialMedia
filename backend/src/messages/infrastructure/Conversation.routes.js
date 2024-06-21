const { Router } = require("express");
const index = require("../Conversations/index");
const router = Router();

router.get("/all/:userId", index.query.getConversations);

router.get("/one/:conversationId", index.query.getConversation);

router.get("/unReadConversations/:userId", index.query.getUnReadConversations);

router.post("/", index.mutation.Conversation);

router.get("/conversationId/:userId/:friendId", index.query.getConversationId)

router.put("/block/:conversationId", index.mutation.blockContact);

module.exports = router;
