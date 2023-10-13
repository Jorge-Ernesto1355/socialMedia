module.exports = function formatedUserToAlgolia(user){

    if(!user) return {}

    return {
        objectID: user._id.toString(), 
        username: user?.username, 
        email:user.username, 
    }

}