const User = require('../../users/domain/UserModel')
const {Token} =  require('./RegisterUser')
const {JWTSecretReset} = require('../../dotenv')
const SendEmail = require('../../nodemailer/sendEmail')

const ForgotPassword = async (req, res)=>{

  const {username} = req.body
  if(!username) return res.status(404).json({message:"user not found"})
  


  const message = 'check your email for a link to reset your password'
  let verifycationLink;
  let emailStatus = 'OK'
  let user

  try {

     user = await User.findOne({username:username})
     const token = Token(user._id, JWTSecretReset)
     
     verifycationLink = `http://localhost:3000/new-password/${token}`
     user.resetToken = token
    
  } catch (error) {
    return res.status(401).json({message:"algo ha salido mal"})
  }
  
  try {
   await SendEmail("Forgot Password",
    user.email,
   "se le olvido la password jover?",
    "no pos ni como hacerle weon",`
    <b> please click on the followin link, or paste this into your browser </b>
    <a href="${verifycationLink}>${verifycationLink}<a/>"
    `)
   
  } catch (error) {
    return res.status(400).json({message:error})
  }

  

  try {
    await user.save()
  } catch (error) {
    emailStatus = error
    return res.status(400).json({message:"something went wrong"})
  }


  return res.json({message, info:emailStatus})


}


module.exports = ForgotPassword