
const ForgotPassword = require('./ForgotPassword')
const LoginUser = require('./LoginUser')
const RegisterUser = require('./RegisterUser')
const updateUserProfile = require('../Update/UpdateUserProfile')
const NewPassword = require('../authUser/NewPassword')

module.exports = {
  ForgotPassword,
  updateUserProfile,
  LoginUser, 
  RegisterUser, 
  NewPassword,
  
}
