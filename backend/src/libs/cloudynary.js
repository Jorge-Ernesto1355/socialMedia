const { v2: cloudinary } = require("cloudinary");
const exits = require("./exits");
const { createReadStream, statSync } = require('fs');

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
        folder: "images",
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

 
static async uploadVideo({video}) {
 
  try {
   return await cloudinary.uploader.upload(video?.tempFilePath, {resource_type: "video", public_id: video.name, eager: [
      { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
      { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" }
    ], eager_async: true})
  
  } catch (error) {
    return {
      error, 
      message: error.message
    }
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


  static async getImageUrls({public_id}){
    try {

       const fullImageUrl = cloudinary.url(public_id, {
        secure: true
       })

       const previewUrl = cloudinary.url(public_id, {
        secure: true, 
        quality: "auto:low", 
        fetch_format: "auto"
       })

       return {
        url: fullImageUrl,
        previewUrl ,
        public_id, 

       }
        
    } catch (error) {
      return {
        error, 
        message: error.message
      }
    }
  }
}

module.exports = cloudinaryService;
