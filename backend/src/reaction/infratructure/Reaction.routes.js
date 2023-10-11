const { Router } = require("express");
const index = require("../index");

const router = Router();

router.put("/:containerId", index.mutation.React);

router.get("/all/:containerId/:type", index.query.getReactions);

router.get("/:containerId/:type", index.query.getReaction);

router.get("/view/:containerId/:type", index.query.getViewReactions);

module.exports = router;
