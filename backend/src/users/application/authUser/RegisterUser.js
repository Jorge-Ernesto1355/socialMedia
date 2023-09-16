const User = require('../../domain/UserModel')

const {Token, encryptPassword} = require('../../../auth/application/auth')




const RegisteryUser = async (req, res, next)=>{
  const {username, email, password, curp} = req.body

  try{

   
    
    
     const user = await User.findOne({ username: username });
    if (user)
      return res.status(400).json({ message: "nombre ya esta en uso" });
    const emailFound = await User.findOne({ email: email });
    if (emailFound)
      return res.status(400).json({ message: "correo ya esta en uso" });
    const curpFound = await User.findOne({curp:curp})
    if(curpFound) 
       return res.status(400).json({ message: "curp ya esta en uso" }); 
    
   
    const newuser = await new User({username, email,curp, password: await encryptPassword(password) } )
    await newuser.save()

    
    return res.status(201).json({
          token: Token(newuser._id),
          user: newuser
             })

    

  }catch(e){
   
    return res.status(500).json(e)
    
  }
}

module.exports = RegisteryUser
 
  
