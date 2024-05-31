const { v2: cloudinary } = require("cloudinary");
const exits = require("./exits");

cloudinary.config({
  cloud_name: "cbta",
  api_key: "911678697972225",
  api_secret: "k5TzOoP0uMgprtv1sDAprFTwtHo",
});

class cloudinaryService {
  static async upload(object) {
    try {
      exits(object);
      const { filePath } = object;
      
      if (!filePath) return null;
      const resultImage = await cloudinary.uploader.upload(filePath, {
        folder: "prueba",
      });

      const image = {
        url: resultImage.secure_url,
        public_id: resultImage.public_id,
      };

      return image;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async deleteImage(object) {
    try {
      exits(object);
      const { imageId } = object;
      await cloudinary.uploader.destroy(imageId)
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
}

module.exports = cloudinaryService;
