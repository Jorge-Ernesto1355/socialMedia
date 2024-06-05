const userService = require("../../userService");


const uploadCoverPicture = async (req, res) => {
  const { userId } = req.params;
  const coverPicture = req.files?.coverPicture;


  const uploadCoverPicture = await userService.uploadCoverPicture({
    userId,
    coverPicture,
  });

  if (uploadCoverPicture?.error) {
    return res.status(500).json({ error: uploadCoverPicture?.message });
  }

  return res.status(201).json({ message: "uploaded cover picture" });
};

module.exports = uploadCoverPicture;
