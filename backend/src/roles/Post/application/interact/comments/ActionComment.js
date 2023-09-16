const Comment = require('../../../dominio/comments')
const ActionComments  = require('../../../dominio/ActionsComment')


const GiveLike = async (req, res)=>{
  const {userid, delAction} = req.query
  const {label, userId} = req.body
  const {id} = req.params
  
  
  //userid es para saber si ya le diste like o no 
  //id es el comment al que se le da una accion
  //userId es para meter en el action
  
  try {

   
    //tener todos los actions en un array
    let actions = []

    //para saber si esta el user o no
    let boolean= null

    //para actualizar el action 
    let actionId = null
    

    const comment = await Comment.findById(id)
    
    
    
    if(!comment){
      return res.status(404)
    }


      for (let i = 0; i < comment.comment.actions.length; i++) {
     
       const action = await ActionComments.findById(comment.comment.actions[i])
       actions = [...actions, action]
       
       }
       
   
       actions.forEach((action)=>{

       if(action == null){
        
       }else{
         if(action.userId == userid){
           boolean = true
           actionId = action._id
          
   
         }else{
          boolean = false
         }
         

       }
         
       })

        
if(delAction){
  if(actionId == null){

  }else{
    await ActionComments.findByIdAndDelete(actionId)
    await comment.comment.updateOne({$pull:{actions:actionId}})
    await comment.comment.save()
    return res.status(204)
  }
}
    
    if(!boolean){
      

      //crear la action
    
      const actionsComments = await new ActionComments({label, userId})
     
      
      const actionSaved = await actionsComments.save()
 
      comment.comment.actions = [...comment.comment.actions, actionSaved]
       await comment.save()

      return res.status(200).json({message:'se ha reaccionado'});

    }else{

      const ks =  await ActionComments.findByIdAndUpdate(actionId, {label, userId})
        
      return res.status(200).json({message:'se ha cambiado'})

    }
    
  } catch (err) {
    
   return  res.status(500).json({message:"algo salio mal"});
  }
}


module.exports = GiveLike