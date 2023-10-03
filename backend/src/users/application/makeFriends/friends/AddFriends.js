const User = require("../../../domain/UserModel");

const addFriends = async (req, res) => {
  const { userId, addUser } = req.query;

  // userId donde vamos agregar el usuario
  //addUser usuario que queremos añadir

  if (!userId && !addUser)
    return res.status(500).json({ message: "algo salio mal " });

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(500).json({ message: "algo salio mal " });

    if (user.friends.includes(addUser))
      return res.status(201).json({ message: "ya lo tienes de amigos" });

    if (!user.friendsWaiting.includes(addUser)) {
      await user.updateOne({ $push: { friendsWaiting: addUser } });

      await user.save();
      res.status(201).json({ message: "se ha mandado solicitud" });
    } else {
      return res
        .status(200)
        .json({ message: "no puedes enviar dos veces solicitud" });
    }
  } catch (error) {
    return res.status(500).json({ message: "algo salio mal " });
  }
};

module.exports = addFriends;
