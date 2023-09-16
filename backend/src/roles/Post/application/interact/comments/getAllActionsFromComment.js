
const User = require('../../../../users/domain/UserModel')
const ActionsComment = require('../../../dominio/ActionsComment')
const Comment = require('../../../dominio/comments')


const getAllActionsFormComment = async  (req, res)=>{
 
  const ActionsComments = await Comment.findById(req.params.id).populate('actions')

  allActions = await Promise.all(
    ActionsComments.comment.actions.map((actionId)=>{
      return ActionsComment.findById(actionId)
    })
  )


  let gusta = [];
  let encanta = [];
  let asombra = [];
  let entristece = [];
  let divierte = [];





  allActions.forEach((action) => {
    if (action.label === 'gusta') gusta = [...gusta, action.userId];
    if (action.label === 'encanta') encanta = [...encanta, action.userId];
    if (action.label === 'asombra') asombra = [...asombra, action.userId];
    if (action.label === 'entristece') entristece = [...entristece, action.userId];
    if (action.label === 'divierte') divierte = [...divierte, action.userId];
  });

 const gustaActions = await Promise.all(
  gusta?.map((userId)=>{
    return User.findById(userId)
  })
 )
  const encantaActions = await Promise.all(
  encanta?.map((userId)=>{
    return User.findById(userId)
  })
 )

  const entristeceActions = await Promise.all(
  entristece?.map((userId)=>{
    return User.findById(userId)
  })
 )

  const divierteActions = await Promise.all(
  divierte?.map((userId)=>{
    return User.findById(userId)
  })
 )

  const asombraActions = await Promise.all(
  asombra?.map((userId)=>{
    return User.findById(userId)
  })
 )


return res.status(200).json({actions:{
  gustaActions, 
  encantaActions, 
  asombraActions, 
  divierteActions, 
  entristeceActions
}, allActions:allActions})

}

module.exports =  getAllActionsFormComment