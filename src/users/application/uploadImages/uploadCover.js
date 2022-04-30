const { uploadImage } = require("../../../libs/cloudynary")
const User = require("../../domain/UserModel")
const fs = require('fs-extra')

const UploadCover = async (req, res)=>{

  const user = await User.findById(req.query.userId)
  
  if(!user){
    res.status(404).json({message:"user no encontrado"})
  }

  try {
    
      if(!req.files.image){
         res.status(404).json({message:"envio un archivo invalido"})
        
        }
        else{
           const result = await uploadImage(req.files.image.tempFilePath)  
          await fs.remove(req.files.image.tempFilePath)
          const imageCover =  {
              url: result.secure_url, 
              public_id:result.public_id
            }
          user.coverPicture = imageCover
    
          await user.save()
    
          res.status(202).json({message:"se ha agregado una foto"})
        }
  } catch (error) {

    res.status(500).json({message:"algo salio mal"})
    
  }

}

module.exports = UploadCover