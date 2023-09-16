const  Comment = require("../../../dominio/comments")



const updateCommentResponded = async (req, res)=>{

  const {id} = req.params
  const {commentResponded} = req.query

  try {
    const responded = await Comment.findById(id).select(['commentsResponded'])

  if(!responded){
    return res.status(400)
  }

  for (let i = 0; i < responded.commentsResponded.length; i++) {
        
        if(responded.commentsResponded[i]._id == commentResponded ){
          
          commentRespondedChoosed = responded.commentsResponded[i]
        }
        
      }  
  
commentRespondedChoosed.text = req.body.text 
await responded.save()

  return res.status(202).json({message:'se actualizp'})
  } catch (error) {
    return res.status(500).json({message:'algo salio mal'})
  }
  



}

module.exports  = updateCommentResponded