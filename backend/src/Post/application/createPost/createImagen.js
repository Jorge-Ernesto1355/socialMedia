const { uploadImage } = require("../../../libs/cloudynary");
const fs = require("fs-extra");

const createImagen = async (files) => {
  if (!files?.image) return null;

  const result = await uploadImage(req.files.image.tempFilePath);

  await fs.remove(req.files.image.tempFilePath);
  return (image = {
    url: result.secure_url,
    public_id: result.public_id,
  });
};

module.exports = createImagen;
