module.exports = function getUserInfo(user){
    return {
        username: user.username, 
        id: user._id, 
    }

}