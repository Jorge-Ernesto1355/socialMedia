const User = require('../../domain/UserModel')
const {checkDuplicateUsernameOrEmail} = require('../../../middleware/middleware')
const {validationResult} = require('express-validator')
const {Token, encryptPassword} = require('../../../auth/application/auth')





 

const RegisteryUser = async (req, res, next)=>{
  const {username, email, password} = req.body



  try{

    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      
      return res.status(500).json({errors:errors.array()})
    }

    
    
        if(errors.isEmpty()){

          return checkDuplicateUsernameOrEmail(req,res, next)
        }
      
        const newuser = await new User({username, email, password: await encryptPassword(password) })
         await newuser.save()


        return res.status(201).json({
          token: Token(newuser._id),
          user:newuser
        })
    

  }catch(e){
    return res.status(500).json({message:"algo salio mal"})
  }
}

module.exports =  RegisteryUser
 
  
