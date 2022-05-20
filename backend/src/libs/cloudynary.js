const {v2} = require('cloudinary')

v2.config({
  cloud_name:"cbta", 
  api_key:"911678697972225", 
  api_secret:"k5TzOoP0uMgprtv1sDAprFTwtHo"

})

const uploadImage = async  (filePath)=>{
 return await  v2.uploader.upload(filePath, {
    folder:"prueba"
  })
}

const deleteImage = async (id)=>{
   await v2.uploader.destroy(id)
}

module.exports = {
  deleteImage, 
  uploadImage
}


