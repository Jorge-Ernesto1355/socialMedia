const Post = require("../dominio/Post")

const DeletePost = async (req, res)=>{

  
    const {id} = req.params

    const post = await Post.findById(id)

     if(req.body.userId === post.userId){
       await Post.findByIdAndDelete(id)
     }
    
}

module.exports  = DeletePost