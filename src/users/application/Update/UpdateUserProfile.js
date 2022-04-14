const User = require("../../domain/UserModel")




const updateUserProfile = async ( req, res )=>{
  const {id} = req.params
  const {Admin, password, userId} = req.body
  console.log(password, userId)

 if( id || Admin){
   if(password){

    const user = await User.findByIdAndUpdate(id, req.body)
    res.status(200).json(user)

   }
 }else{
   res.status(403).json({
     message:'no puedes actualizar una cuenta que no es tuya'
   })
 }
}

module.exports = updateUserProfile