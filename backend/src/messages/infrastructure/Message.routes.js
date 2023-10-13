const { Router } = require("express");
const index = require("../Messages/index");
const router = Router();

router.get("/", index.query.messages);

router.post("/", index.mutation.message);

router.delete("/", index.mutation.deleteMessage);

router.put("/", index.mutation.updateMessage);

module.exports = router;
