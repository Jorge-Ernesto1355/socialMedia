const { Router } = require("express");
const PostIndex = require("../application/PostIndex");
const verifyToken = require("../../auth/application/verifySignup");

const route = Router();

route.get("/", verifyToken, PostIndex.FindAllPost);

route.get("/timeline/:userId", PostIndex.findTimeLine);

route.post("/", PostIndex.createPost);

route.put("/:id", PostIndex.UpdatePost);

route.put("/share/:id", PostIndex.Share);

route.delete("/:id", PostIndex.DeletePost);

route.get("/:id", PostIndex.FindPostById);

route.get("/action/shares/all", PostIndex.allShared);

route.put("/votes/add", PostIndex.Votes);

route.get("/votes", PostIndex.UsersVotes);

route.get("/votes/:id", PostIndex.getVotes);

route.put("/reaction/favorite/:postId", PostIndex.favorite);


route.get("/reaction/view/:id", PostIndex.FindReactionPostView);


module.exports = route;
