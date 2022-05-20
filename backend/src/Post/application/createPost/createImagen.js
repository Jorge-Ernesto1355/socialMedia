const {uploadImage} = require('../../../src/libs/cloudynary')


const createImagen = async (req)=>{
     const result = await uploadImage(req.files.image.tempFilePath)
      
     await fs.remove(req.files.image.tempFilePath)
     return  image = {
        url:result.secure_url, 
        public_id:result.public_id
      }
}

module.exports = createImagen