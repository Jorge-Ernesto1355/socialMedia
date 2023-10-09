

const { validateUserLogin } = require('../../users/validation/userSchema')
const AuthService = require('./AuthService')




const LoginUser = async (req, res)=>{


  const {email, password} = req.body

  const result = validateUserLogin({email, password})

  if(result.error){
    return res.status(400).json({error:result.error.message})
  }

  const user = await AuthService.login({email, password})

  if(user?.error)  
     return res.status(500).json({error: user.message})

  return res.status(200).json(user)
}

module.exports = LoginUser