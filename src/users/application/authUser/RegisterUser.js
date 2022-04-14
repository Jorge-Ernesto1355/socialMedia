const User = require('../../domain/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {SecretRefreshToken, SECRET} = require('../../../../dotenv')


const EmailFound = async (email)=>{
    const EmailFound = await User.findOne({email:email})
    return EmailFound
   
}

const refreshToken = (id)=>{
 return jwt.sign({ id: id }, SecretRefreshToken , { expiresIn:86400 /*24 hour*/  })

}

const Token = (id, JWTSecret)=>{
 return jwt.sign({ id: id },  JWTSecret , {expiresIn:86400 /*24 hour*/  })
     
}

const encryptPassword = async (password)=>{
   const salt = bcrypt.genSaltSync(10);
   return  bcrypt.hashSync(password, salt)
  }
  
 

const RegisteryUser = async (req, res)=>{
  const {username, email, password} = req.body

  try{
    
    if(!!EmailFound(email)){
      
         const newuser = await new User({username, email, password: await encryptPassword(password) })
          await newuser.save()
          

         res.status(201).json({
           token: Token(newuser._id),
           user:newuser
         })
      }else{

        res.status(409).json({
          message:"email esta ocupado"
        })
      }

  }catch(e){
    console.log(e)
  }
}

module.exports = {
  RegisteryUser,
  refreshToken, 
  Token,
  encryptPassword
}