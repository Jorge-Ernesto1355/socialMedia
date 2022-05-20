const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {SecretRefreshToken,Secret} = require('../../../dotenv')




const refreshToken = (id)=>{
 return jwt.sign({ id: id }, SecretRefreshToken , { expiresIn:86400 /*24 hour*/  })

}

const Token = (id, JWTSecret)=>{
 return jwt.sign({ id: id },  Secret , {expiresIn:86400 /*24 hour*/  })
     
}

const encryptPassword = async (password)=>{
   const salt = bcrypt.genSaltSync(10);
   return  bcrypt.hashSync(password, salt)
}

const comparePassword = async (passwordBody,passwordCompare )=>{
   return await bcrypt.compare(passwordBody, passwordCompare)
}


module.exports = {
  refreshToken, 
  Token, 
  encryptPassword,
  comparePassword
}