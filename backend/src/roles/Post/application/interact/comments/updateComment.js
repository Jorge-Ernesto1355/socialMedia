
const Comment = require('../../../dominio/comments')


const updateComment = async (req, res)=> {
  const {id} = req.params

  
  const comments = await Comment.findById(id)
if(!comments){
  return res.status(400)
}
  comments.comment.text = req.body.text
  comments.comment.edit = true
  await comments.save()
 

    

 return res.status(201).json({message:'comentario actualizado'})
}


module.exports = updateComment