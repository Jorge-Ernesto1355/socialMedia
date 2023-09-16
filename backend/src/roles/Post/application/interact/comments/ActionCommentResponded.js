const Comment = require('../../../dominio/comments')
const ActionComments  = require('../../../dominio/ActionsComment')


const reactToResponded = async (req, res)=>{
  const {userid, delAction, commentResponded} = req.query
  const {label, userId} = req.body
  const {id} = req.params
  

  //userid es para saber si ya le diste like o no 
  //id es el responded al que se le da una accion
  //userId es para meter en el action
  
  try {

   
    //tener todos los actions en un array
    let actions = []

    //para saber si esta el user o no
    let boolean= null

    //para actualizar el action 
    let actionId = null
    
    //obtener un solo comentarioen commentResponded
    let commentRespondedChoosed = []
    
    const responded = await Comment.findById(id).select(['commentsResponded'])

    

    if(!responded){
      return res.status(500).json({message:"algo salio mal"})
    }
    
      for (let i = 0; i < responded.commentsResponded.length; i++) {
        
        if(responded.commentsResponded[i]._id == commentResponded ){
          
          commentRespondedChoosed = responded.commentsResponded[i]
        }
        
      }    
    
    
    if(!responded){
      return res.status(404)
    }


      for (let i = 0; i < commentRespondedChoosed.length; i++) {
     
       const action = await ActionComments.findById(commentRespondedChoosed.actions[i])
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
    await responded.commentsResponded.updateOne({$pull:{actions:actionId}})
    await responded.commentsResponded.save()
    return res.status(204)
  }
}
    
    if(!boolean){
      

      //crear la action
    
      const actionsComments = await new ActionComments({label, userId})
     
      
      const actionSaved = await actionsComments.save()
 
      commentRespondedChoosed.actions = [...commentRespondedChoosed.actions, actionSaved]
       await responded.save()

      return res.status(200).json({message:'se ha reaccionado'});

    }else{

      const ks =  await ActionComments.findByIdAndUpdate(actionId, {label, userId})
        
      return res.status(200).json({message:'se ha cambiado'})

    }
    
  } catch (err) {
    console.log(err)
   return  res.status(500).json({message:"algo salio mal"});
  }
}


module.exports = reactToResponded