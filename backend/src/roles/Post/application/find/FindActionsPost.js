const Action = require('../../dominio/Action')
const Post = require('../../dominio/Post')


const FindActionPost = async  (req, res)=>{

  const actionPost = await Post.findById(req.params.id).select(['actions']).populate('actions')
  



  return res.status(200).json(actionPost)

}

module.exports =  FindActionPost