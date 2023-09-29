const UserModel = require("../../../domain/UserModel");

const addFriends = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(500).json({ message: "algo salio mal " });

  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;

  const options = {
    limit,
    page,
    select: "username _id friends ",
  };

  try {
    const user = await UserModel.findById(userId)
      .select(["friendsWaiting"])
      .populate(["friendsWaiting"]);
    console.log(user.friendsWaiting);

    const requestFriends = await UserModel.paginate(
      { _id: { $in: user?.friendsWaiting?.map((userId) => userId) } },
      options
    );
    return res.status(200).json(requestFriends);
  } catch (error) {
    return res.status(500).json({ message: "algo salio mal " });
  }

  // userId donde vamos agregar el usuario
  //addUser usuario que queremos añadir
};

module.exports = addFriends;
