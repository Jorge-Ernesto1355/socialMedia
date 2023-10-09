
const AuthService = require('./AuthService')

const RefreshToken = async (req, res)=>{

  var token = req?.headers?.authorization?.split(' ')[1];



  const accessToken = await AuthService.refresh({refreshToken:token})

  if(accessToken?.error){
    return res.status(500).json({error:accessToken.message})
  }

  return res.status(200).json(accessToken)
  

}


module.exports = RefreshToken