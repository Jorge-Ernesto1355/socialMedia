const Post = require("../dominio/Post")

const User = require("../../src/users/domain/UserModel")
const {deleteImage} = require('../../src/libs/cloudynary')

const DeletePost = async (req, res)=>{

  
    const {id} = req.params
    const {userShared, userId} = req.query

    //userShared es para borrar una publicacion que tu compartise 
    //userId es para borrar una publicacion que tu creaste 

    const post = await Post.findById(id)
    const user = await User.findById(userId)
 
    if(userShared){

      try {
        if(!post.shares.includes(userShared)){
          res.status(200).json({message:"se ha borrado"})
        }else{

        
          await post.UpdateOne({$pull:{shares: userShared}})
          await user.UpdateOne({$pull:{posts:post}})
  
          await post.save()
          await user.save()
        }
      } catch (error) {
         res.status(500).json({message:"recursos no coinciden"})
      }
    }

    try {

       if(userId === post.userId){
         const post = await Post.findByIdAndDelete(id)

         if(post && post.image.public_id){
          
           await deleteImage(post.image.public_id)
       }

       res.status(204).json({message:"recurso borrado"})
      
       

     }
     
    } catch (error) {
       res.status(500).json({message:"recursos no coinciden borrar completamente"})
    }
    
   

    
     
    
}

module.exports  = DeletePost