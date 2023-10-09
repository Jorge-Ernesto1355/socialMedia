
const ForgotPassword = require('./application/ForgotPassword')
const LoginUser = require('./application/LoginUser')
const Register = require('./application/RegisterUser')
const updateUserProfile = require('../users/application/Update/UpdateUserProfile')
const NewPassword = require('./application/NewPassword')
const refresh = require('./application/RefreshToken')

module.exports = {
  ForgotPassword,
  updateUserProfile,
  LoginUser, 
  Register, 
  NewPassword,
  refresh
  
}
