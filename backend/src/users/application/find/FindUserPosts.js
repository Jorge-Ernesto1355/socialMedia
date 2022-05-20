const Post = require("../../../../Post/dominio/Post")



const FindUserPost = async (req, res)=>{

  
  const {userId} = req.query
  
  if(userId){

    try {

        const userPost = await Post.find({userId:userId})
        if(!userPost){
          return res.status(404).json({message:"recurso no encontrado"})
        }
        res.status(200).json(userPost)
        
  
    } catch (error) {
      res.status(500).json({message:"algo salio mal "})
    }

  }



  

  res.status(200).json(user.posts)

  

}

module.exports  = FindUserPost