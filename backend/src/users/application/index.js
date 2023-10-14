const getUsers = require("./find/FindAllUsers");
const FindUserById = require("./find/FindUserById");
const getFriends = require("./find/FindAllFollowers");
const getPosts = require("./find/FindUserPosts");
const AcceptFriends = require("./makeFriends/friends/AcceptFriends");
const addFriend = require("./makeFriends/friends/AddFriends");
const deleteFriend = require("../application/makeFriends/friends/deleteFriends");
const UploadImageProfile = require("../application/uploadImages/UploadImageProfile");
const addRelationShip = require("../application/makeFriends/relationship/addRelationShip");
const AcceptRelationShip = require("../application/makeFriends/relationship/AcceptRelationShip");
const deleteRelationShip = require("../application/makeFriends/relationship/deleteRelationShip");
const giveRoles = require("../../roles/application/giveRoles");
const deleteRoles = require("../../roles/application/removeRoles");
const getRequestFriends = require("../application/makeFriends/friends/getRequestFriend");
const deleteUser = require("./Delete/DeleteUserById");
const getUsersTagged = require("./find/getUsersTagged");
module.exports = {
  query: {
    getUsers,
    FindUserById,
    getFriends,
    getPosts,
    getRequestFriends,
    getUsersTagged,
  },
  mutation: {
    AcceptFriends,
    addFriend,
    deleteFriend,
    UploadImageProfile,
    addRelationShip,
    deleteRelationShip,
    AcceptRelationShip,
    giveRoles,
    deleteRoles,
    deleteUser,
  },
};
