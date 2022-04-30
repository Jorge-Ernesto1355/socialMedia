const User = require("../../domain/UserModel")
const fs = require('fs-extra')
const { uploadImage } = require("../../../libs/cloudynary")

const UploadProfilePicture = async (req, res)=>{

    const {userId } = req.query 
    let user

    try {

      
        user = await User.findById(userId)
      


      if(!user){
        return res.status(404).json({message:"user no encontrado"})
      }
    

    if(!req.files.image){
  
       res.status(404).json({message:"envio un archivo valido"})
       
      }
      else{
           const result = await uploadImage(req.files.image.tempFilePath) 
         
        await fs.remove(req.files.image.tempFilePath)
        const ProfilePicture =  {
          url: result.secure_url, 
          public_id:result.public_id
        }
        user.imageProfile = ProfilePicture
  
        await user.save()
  
        res.status(202).json({message:"se ha agregado una foto"})
      }
  

    } catch (error) {
      res.status(500).json({message:"algo salio mal"})
    }
  
}

module.exports = UploadProfilePicture