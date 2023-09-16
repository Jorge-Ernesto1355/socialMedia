const UserModel = require('../../../../../users/domain/UserModel')
const Post = require('../../../../dominio/Post')
const Reaction  = require('../../../../dominio/Reaction')

const GiveLike = async (req, res)=>{
  const {userid} = req.query
  const {label, userId} = req.body
  const {id} = req.params


  

if(!userid && !id && !label && !userId) return res.status(500).json({message:'algo salio mal'});

  
//userid es para saber si ya le diste like o no 
//id es el post al que se le da una accion
//userId es para meter en el action

try {
  const post = await Post.findById(id).populate(['reactions.gusta', 'reactions.encanta', 'reactions.divierte', 'reactions.asombra', 'reactions.entristece'])
  const user = await UserModel.findById(userId)

  if(!post  && !user){
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

    post.reactions[label] = [...post.reactions[label], reactionSaved]
     await post.save()
    }
    
  let reactions = []

  //para saber si esta el user o no
  let exits = false

  //para saber si debemos eliminar y crear o no hacer nada
  let reactionLabel = ''

  //para actualizar el action 
  let reactionId = null
  

  for(key in post.reactions){
    if(typeof post.reactions[key] === 'object') {
      reactions = reactions.concat(post.reactions[key])
    }
   }

   if(reactions.length !== 0){
    
    reactions?.forEach((reaction)=>{
      
      if(typeof reaction === 'object'){
        if(reaction.user.userId == userid){
           reactionId = reaction._id
           reactionLabel = reaction.label
           exits = true
           return
          }
          exits = false

      }
      
     })
      
   }

    if(!exits){
    
      //crear la action
      createReaction()
      return res.status(204).json({message:'se ha reaccionado'});

    }else{
      
      if(reactionLabel === label) return  res.status(204).json({message:'se ha cambiado'})
      console.log(reactionId)
      await Reaction.findByIdAndDelete(reactionId)
     
     createReaction()

      return res.status(204).json({message:'se ha cambiado'})

    }
  } catch (err) {
   return  res.status(500).json({message:err.message});
  }
}


module.exports = GiveLike