const User = require('../../domain/UserModel')
const jwt  = require('jsonwebtoken')
const { validate } = require('class-validator')
const {encryptPassword} = require('./RegisterUser')
const  { JWTSecretReset } = require('../../../../dotenv')


const NewPassword = async (req, res)=>{

  const {newPassword} = req.body
  const resetToken = req.headers.reset 


  if(!(resetToken && newPassword)) return res.status(404).json({message:"todos los campos son requeridos"})

  let user 
  let jwtPayload


  try {

    jwtPayload = jwt.verify(resetToken, JWTSecretReset )
    user = await User.findOne({resetToken:resetToken})
   
    
  } catch (error) {
    console.log(error)
    return res.status(401).json({message:error})
  }
  user.password = await encryptPassword(newPassword)
  user.email = user.email

  await user.save()

  
  const validateOptions = {validationError: {target:false, value:false}}
  const errors = await validate(user, validateOptions)

  if(errors.length > 0){
    return res.status(400).json(errors)
  }

 
  res.status(201).json({message:"password has changed"})
  


}

module.exports = NewPassword