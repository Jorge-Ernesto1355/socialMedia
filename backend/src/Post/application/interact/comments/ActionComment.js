const UserModel = require('../../../../users/domain/UserModel')
const Comment = require('../../../dominio/comments')
const Reaction = require('../../../dominio/Reaction')
const updateComment = require('./updateComment')


const GiveLike = async (req, res)=>{
  const {userid, delAction} = req.query
  const {label, userId} = req.body
  const {id} = req.params
  
  
  //userid es para saber si ya le diste like o no 
  //id es el comment al que se le da una accion
  //userId es para meter en el action
  
  try {

    const comment = await Comment.findById(id).select(['reactions']).populate(['comment.reactions.gusta', 'comment.reactions.encanta', 'comment.reactions.divierte', 'comment.reactions.asombra', 'comment.reactions.entristece'])
    const user = await UserModel.findById(userId)

    if(!comment && !user){
      return res.status(404)
    }

    const createReaction = async ()=>{
      const reaction = await new Reaction({label, user:{
        userId,
        username:user.username, 
        imageProfile:{
          url:user.imageProfile.url,
          public_id:user.imageProfile.public_id
          
        }
      }})
     
      const reactionSaved = await reaction.save()
      comment.comment.reactions[label] = [...comment.comment.reactions[label], reactionSaved]
       await comment.save()
      return res.status(200).json({message:'se ha reaccionado'});
    }

    const updateReaction = async ({reactionId, reactionLabel})=>{
      

      if(reactionLabel === label) return res.status(204).json({message:'no se ah cambiado por que el label es igal'})
      await Reaction.findByIdAndDelete(reactionId)
      createReaction()
      
       
    }

    console.log(comment)
   
    //tener todos los actions en un array
    let reactions = []

      //we are concatening all reaction label {gusta, encanta, etc}
      for(key in comment.comment.reactions){
        if(typeof comment.comment.reactions[key] === 'object'){
          reactions = reactions.concat(comment.comment.reactions[key])
        }
      }
      

      //if reactions does not has any length we will create a reaction
      if(reactions.length === 0) createReaction()



      reactions?.forEach((reaction)=>{
      
      if(typeof reaction === 'object'){
        if(reaction.user.userId == userid){
          //if it does will run updateReaction with reactionId and reaction label
           const reactionId = reaction._id
           const  reactionLabel = reaction.label
           updateReaction({reactionId, reactionLabel})
           return
          }
          //if it does not we will create a new
          createReaction()
      }
     })

     
  } catch (err) {
    
   return  res.status(500).json({message:err.message});
  }
}


module.exports = GiveLike