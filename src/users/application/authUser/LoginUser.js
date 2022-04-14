const User = require('../../domain/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = require('../../../../dotenv')
const {Token, RefreshToken, refreshToken} = require('./RegisterUser')


const comparePassword = async  (password, gotPassword )=>{
    return await bcrypt.compare(password, gotPassword)
}

const LoginUser = async (req, res)=>{
  
  const UserFound = await User.findOne({email:req.body.email})
  !UserFound && res.status(404).json("user not found");

  const compare =  comparePassword(req.body.password, UserFound.password )


  if(!compare) return res.status(401).json({token:null, mesage:"invalid password"})

    
  


  res.status(200).json({
    token:Token(UserFound._id), 
    refresh_Token: refreshToken(UserFound._id),
    user:UserFound
  })




  


  

}

module.exports = LoginUser