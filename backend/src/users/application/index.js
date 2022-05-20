
const FindAllUsers = require('./find/FindAllUsers')
const FindUserById = require('./find/FindUserById')
const FindAllFollowers = require('./find/FindAllFollowers')
const FindUserPost = require('./find/FindUserPosts')
const AcceptFriends = require('./makeFriends/friends/AcceptFriends')
const addFriend = require('./makeFriends/friends/AddFriends')
const deleteFriend  = require('../application/makeFriends/friends/deleteFriends')
const UploadProfilePicture = require('../application/uploadImages/uploadProfilePicture')
const UploadCover = require('../application/uploadImages/uploadCover')
const addRelationShip = require('../application/makeFriends/relationship/addRelationShip')
const AcceptRelationShip = require('../application/makeFriends/relationship/AcceptRelationShip')
const deleteRelationShip = require('../application/makeFriends/relationship/deleteRelationShip')
const giveRoles = require('../../roles/application/giveRoles')
const deleteRoles = require('../../roles/application/removeRoles')

module.exports = {
FindUserPost,
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
AcceptRelationShip , 
giveRoles,
deleteRoles




}


