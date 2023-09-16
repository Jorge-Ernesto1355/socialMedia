const Post = require('../../../Post/dominio/Post')



const FindUserPost = async (req, res)=>{

  
  const {userId} = req.params
 
  if(userId){

    try {

        const userPost = await Post.find({userId:userId})
        if(!userPost){
          return res.status(404).json({message:"recurso no encontrado"})
        }

       return  res.status(200).json(userPost)
        
  
    } catch (error) {
      res.status(500).json({message:"algo salio mal "})
    }

  }

  return res.status(200).json({message:"algo salio mal "})

}

module.exports  = FindUserPost