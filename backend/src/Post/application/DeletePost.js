
const PostService = require("../PostService")

const DeletePost = async (req, res)=>{

  
    const {id} = req.params
    const {userId} = req.query
    


    const deletePost = await PostService.delete({postId:id})
    console.log(deletePost)

    if(deletePost?.error){
      
      return res.status(500).json({error:deletePost?.message})
    }

    return res.status(204).json({message:'completed'})


    
}

module.exports  = DeletePost