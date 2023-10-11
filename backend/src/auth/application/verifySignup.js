const jwt = require("jsonwebtoken")
const User = require('../../users/domain/UserModel')
const SECRET = require('../../dotenv');


const verifyToken = async (req, res, next)=>{
  var token = req?.headers?.authorization?.split(' ')[1];
  console.log(token)

  if(!token) return res.status(403).json({
    message:"no token provider or invalid token "
  })

  if(token){
    
    try {
   
     const decoded = jwt.verify(token, SECRET.ACCESS_TOKEN_SECRET)
     if(decoded) {
       req.userId = decoded.id
       next()
     }else{
      return res.status(403).json({error:'not autorizado'})
     }
   
    
    } catch (error) {
       return res.status(403).json({error:error.message})
    }
  }

}

module.exports = verifyToken