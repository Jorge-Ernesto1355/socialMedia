const User = require("../../../domain/UserModel");
const userService = require("../../../userService");

const addFriends = async (req, res) => {
  const { userId, addUserId } = req.query;

  // userId donde vamos agregar el usuario
  //addUser usuario que queremos añadir


  const addFriend = await userService.addFriend({userId, addUserId})

  if(addFriend?.error){
    return res.status(500).json({error:addFriend.message})
  }

  return res.status(201).json({message:"sended request"})
};

module.exports = addFriends;
