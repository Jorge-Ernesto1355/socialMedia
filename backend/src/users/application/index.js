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
const getUsersOnline = require("./find/getUsersOnline.js");
const getUsersTagged = require("./find/getUsersTagged");
const hidePost = require("./interactions/hidePost.js");
const hideAllPosts = require("./interactions/hideAllPost.js");
const report = require("./interactions/report.js");
const unFollow = require("./interactions/unFollow.js");
module.exports = {
  query: {
    getUsers,
    FindUserById,
    getFriends,
    getPosts,
    getRequestFriends,
    getUsersTagged,
    getUsersOnline,
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
    hidePost, 
    hideAllPosts, 
    report, 
    unFollow
  },
};
