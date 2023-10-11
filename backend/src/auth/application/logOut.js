
const AuthService = require("./AuthService")

const LogOut = async (req, res)=>{

  const cookies = req.cookies
  if(!cookies.jwt) return res.sendStatus(204)

  const refreshToken = cookies.jwt

  const token = await AuthService.logOut({refreshToken})
  
  if(token.error){
    return res.status(500).json({error:token.message})
  }

  return res.sendStatus(204)

}

module.exports = LogOut