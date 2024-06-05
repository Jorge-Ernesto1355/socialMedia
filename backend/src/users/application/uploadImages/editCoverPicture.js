const userService = require("../../userService");

const editCoverPicture = async (req, res) => {


  const { userId } = req.params;
 const objectImage = req.body


  const editCoverPicture = await userService.editCoverPicture({
    userId,
    objectImage,
  });

  if (editCoverPicture?.error) {
    return res.status(500).json({ error: editCoverPicture?.message });
  }

  return res.status(201).json(editCoverPicture);
};

module.exports = editCoverPicture;
