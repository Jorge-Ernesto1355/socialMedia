const User = require('../../domain/UserModel')
const {validationResult} = require('express-validator')
const {Token,comparePassword, refreshToken} = require('../../../auth/application/auth')




const LoginUser = async (req, res)=>{


  const UserFound = await User.findOne({email:req.body.email})
  if(!UserFound){
    return  res.status(404).json({message:"user not found"});
  }

  

    const errors = validationResult(req)

    if(!errors.isEmpty()){
      
      return res.status(500).json({errors:errors.array()})
    }


    const compare = comparePassword(req.body.password, UserFound.password )
    if(!compare) return res.status(401).json({token:null, mesage:"invalid password"}) 


  res.status(200).json({
    token:Token(UserFound._id), 
    refresh_Token: refreshToken(UserFound._id),
    user:UserFound
  })

}

module.exports = LoginUser