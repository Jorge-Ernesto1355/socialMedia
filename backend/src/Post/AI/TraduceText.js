
const PostService = require("../PostService")

const TraduceText = async (req, res)=>{

  
    const {postId} = req.params
   
    


    const TraduceText = await PostService.traduceText({postId})


    if(TraduceText?.error){
      
      return res.status(500).json({error:TraduceText?.message})
    }

    return res.status(200).json({translationText: TraduceText})


    
}

module.exports  = TraduceText