const userService = require("../../userService");

const UploadProfilePicture = async (req, res) => {
  const { userId } = req.params;

  const image = req.files?.image;

  const uploadProfilePicture = await userService.uploadProfilePicture({
    userId,
    image,
  });

  if (uploadProfilePicture?.error) {
    return res.status(500).json({ error: uploadProfilePicture?.message });
  }

  return res.status(201).json({ message: "uploaded photo profile" });
};

module.exports = UploadProfilePicture;
