const { uploadImage } = require("../../../libs/cloudynary");
const fs = require("fs-extra");

const createImagen = async (files) => {
  if (!files?.image) return null;

  const result = await uploadImage(files?.image?.tempFilePath);

  await fs.remove(files?.image?.tempFilePath);
  return (image = {
    url: result.secure_url,
    public_id: result.public_id,
  });
};

module.exports = createImagen;
