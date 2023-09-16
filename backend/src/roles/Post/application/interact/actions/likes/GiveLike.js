const Post = require('../../../../dominio/Post')
const Action  = require('../../../../dominio/Action')

const GiveLike = async (req, res)=>{
  const {userid, delAction} = req.query
  const {label, userId} = req.body
  const {id} = req.params



  
  //userid es para saber si ya le diste like o no 
  //id es el post al que se le da una accion
  //userId es para meter en el action
  
  try {

   
    //tener todos los actions en un array
    let actions = []

    //para saber si esta el user o no
    let boolean= null

    //para actualizar el action 
    let actionId = null
    

    const post = await Post.findById(id)
    
    if(!post){
      return res.status(404)
    }

      for (let i = 0; i < post.actions.length; i++) {
   
       const action = await Action.findById(post.actions[i])
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
    await Action.findByIdAndDelete(actionId)
    await post.updateOne({$pull:{actions:actionId}})
    await post.save()
    return res.status(204)
  }
}
    
    if(!boolean){
      

      //crear la action
      const action = await new Action({label, userId})
      const actionSaved = await action.save()
     
      
      
      post.actions = [...post.actions, actionSaved]
       await post.save()

      return res.status(204).json({message:'se ha reaccionado'});

    }else{

      const ks =  await Action.findByIdAndUpdate(actionId, {label, userId})
        
      return res.status(204).json({message:'se ha cambiado'})

    }
    
  } catch (err) {
    
   return  res.status(500).json({message:"algo salio mal"});
  }
}


module.exports = GiveLike