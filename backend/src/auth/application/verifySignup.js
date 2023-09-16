const jwt = require("jsonwebtoken")
const User = require('../../users/domain/UserModel')
const SECRET = require('../../dotenv');


const verifyToken = async (req, res, next)=>{
  var token = req.headers.authorization.split(' ')[1];

  if(!token) return res.status(403).json({
    message:"no token provider or invalid token "
  })

  const decoded = jwt.verify(token, SECRET.SECRET)
  if(!decoded) return res.status(400).json({message:'token malo'})

  req.userId = decoded.id

  const user = await  User.findById(req.userId, {password:0})

  if(!user) return res.json(404).json({message:'no user found'})

  next()
}

module.exports = verifyToken