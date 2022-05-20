const User = require('../../users/domain/UserModel')
const jwt = require('jsonwebtoken')
const {SecretRefreshToken, SECRET} = require('../../../dotenv')

const RefreshToken = async (req, res)=>{

  const refreshToken  = req.headers.refresh
  
  let user
  
  if(!refreshToken) return res.status(401).json({message:'something went wrong'})
  
  try {

    const verifyResult = jwt.verify(refreshToken, SecretRefreshToken)
    const {id} =  verifyResult
  
    user = await User.findById(id)
    
  } catch (error) {
    return res.status(401).json({message:"something went wrong"})
  }

  const token = jwt.sign({id: user.id} , SECRET, {
    expiresIn:120
  })

  res.status(201).json({token:token})

}


module.exports = RefreshToken