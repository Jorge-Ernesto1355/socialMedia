const { Router } = require("express");
const PostIndex = require("../application/PostIndex");
const verifyToken = require("../../auth/application/verifySignup");

const route = Router();

route.get("/", verifyToken, PostIndex.FindAllPost);

route.get("/timeline/:userId", PostIndex.findTimeLine);

route.get("/:id", PostIndex.FindPostById);

route.get("/action/shares/all", PostIndex.allShared);

route.get("/votes", PostIndex.UsersVotes);

route.get("/votes/:id", PostIndex.getVotes);

route.post("/", PostIndex.createPost);

route.put("/:postId", PostIndex.UpdatePost);

route.post("/share/postMessage/:postId", PostIndex.sharePostMessage);

route.put("/share/:id", PostIndex.Share);

route.put("/votes/add", PostIndex.Votes);

route.put("/favorite/:postId", PostIndex.favorite);

route.put("/timeExpiration/:postId/:userId", PostIndex.timeExpirationEdit);

route.delete("/:id", PostIndex.DeletePost);

module.exports = route;
