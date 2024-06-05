const userService = require("../../userService");

const editProfilePicture = async (req, res) => {


  const { userId } = req.params;
 const objectImage = req.body


  const uploadProfilePicture = await userService.editProfilePictureFromImages({
    userId,
    objectImage,
  });

  if (uploadProfilePicture?.error) {
    return res.status(500).json({ error: uploadProfilePicture?.message });
  }

  return res.status(201).json(uploadProfilePicture);
};

module.exports = editProfilePicture;
