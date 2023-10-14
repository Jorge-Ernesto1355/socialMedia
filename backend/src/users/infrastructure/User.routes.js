const { Router } = require("express");
const index = require("../application/index");
const DeleteUser = require("../application/Delete/DeleteUserById");
const UpdateUserProfile = require("../application/Update/UpdateUserProfile");
const verifyToken = require("../../auth/application/verifySignup");

const router = Router();

// querys
router.get("/", index.query.getUsers);

router.get("/posts/:userId", index.query.getPosts);

router.get("/:userId", index.query.FindUserById);

router.get("/friends/:userId", index.query.getFriends);

router.get("/friend/request/all/:userId", index.query.getRequestFriends);

router.get("/tagged/:containerId", index.query.getUsersTagged);

//mutations POST
router.post("/upload/:userId", index.mutation.UploadImageProfile);

// router.post("/relationShip", index.mutation.addRelationShip);

// mutation PUT

router.put("/friend/accept", index.mutation.AcceptFriends); //check

router.put("/friend/add", index.mutation.addFriend); //check

router.put("/:userId", UpdateUserProfile);

router.put("/roles/add", index.mutation.giveRoles);

router.put("/relationShip/add", index.mutation.AcceptRelationShip);

//mutation DElETE
router.delete("/relationShip/del", index.mutation.deleteRelationShip);

router.delete("/:userId", index.mutation.deleteUser);

router.delete("/roles/del", index.mutation.deleteRoles);

module.exports = router;
