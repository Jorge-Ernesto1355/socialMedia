const FindAllUsers = require("./find/FindAllUsers");
const FindUserById = require("./find/FindUserById");
const FindAllFollowers = require("./find/FindAllFollowers");
const FindUserPosts = require("./find/FindUserPosts");
const AcceptFriends = require("./makeFriends/friends/AcceptFriends");
const addFriend = require("./makeFriends/friends/AddFriends");
const deleteFriend = require("../application/makeFriends/friends/deleteFriends");
const UploadProfilePicture = require("../application/uploadImages/uploadProfilePicture");
const UploadCover = require("../application/uploadImages/uploadCover");
const addRelationShip = require("../application/makeFriends/relationship/addRelationShip");
const AcceptRelationShip = require("../application/makeFriends/relationship/AcceptRelationShip");
const deleteRelationShip = require("../application/makeFriends/relationship/deleteRelationShip");
const giveRoles = require("../../roles/application/giveRoles");
const deleteRoles = require("../../roles/application/removeRoles");
const FindUsersActions = require("../application/find/FindUsersActions");
const getRequestFriends = require("../application/makeFriends/friends/getRequestFriend");

module.exports = {
  FindUserPosts,
  FindAllUsers,
  FindUserById,
  FindAllFollowers,
  AcceptFriends,
  addFriend,
  deleteFriend,
  UploadCover,
  UploadProfilePicture,
  addRelationShip,
  deleteRelationShip,
  AcceptRelationShip,
  giveRoles,
  deleteRoles,
  FindUserPosts,
  FindUsersActions,
  getRequestFriends,
};
