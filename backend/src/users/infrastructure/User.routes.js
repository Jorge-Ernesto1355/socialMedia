const { Router } = require("express");
const index = require("../application/index");
const DeleteUser = require("../application/Delete/DeleteUserById");
const UpdateUserProfile = require("../application/Update/UpdateUserProfile");
const verifyToken = require("../../auth/application/verifySignup");

const router = Router();


router.get("/", index.query.getUsers);

router.get("/posts/:userId", index.query.getPosts);

router.get("/friends/:userId", index.query.getFriends);

router.get("/friend/request/all/:userId", index.query.getRequestFriends);

router.get("/tagged/:containerId", index.query.getUsersTagged);

router.put("/friend/request/accept", index.mutation.AcceptFriends);

router.get("/online/:userId", index.query.getUsersOnline);

router.get("/photos/:userId", index.query.getPhotos)

router.post("/upload/:userId", index.mutation.UploadImageProfile);

router.post('/upload/coverPicture/:userId', index.mutation.uploadCoverPicture)

router.post("/edit/profile/:userId", index.mutation.updateUserProfile)

router.put('/upload/edit/coverPicture/:userId', index.mutation.editCoverPicture)

router.post("/:userId", index.query.FindUserById);

router.put("/friend/accept/:userId", index.mutation.AcceptFriends); //check

router.put("/friend/add/:userId", index.mutation.addFriend); //check

router.put('/edit/location/:userId', index.mutation.updateUserLocation)



router.put("/roles/add", index.mutation.giveRoles);

router.put("/relationShip/add", index.mutation.AcceptRelationShip);

router.put('/hide/post/:postId/:userId', index.mutation.hidePost)

router.put('/hide/all/post/:userId/:userIdToHide', index.mutation.hideAllPosts)

router.put("/report/post/:postId", index.mutation.report)

router.put("/unFollow/:userId/:friendId", index.mutation.unFollow)

router.put('/upload/edit/profilePicture/:userId', index.mutation.editProfilePicture)

//mutation DElETE
router.delete("/relationShip/del", index.mutation.deleteRelationShip);

router.delete("/:userId", index.mutation.deleteUser);

router.delete("/roles/del", index.mutation.deleteRoles);

module.exports = router;
