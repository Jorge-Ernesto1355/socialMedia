const {Router} = require('express')
const LoginUser = require('../users/application/authUser/LoginUser')
const RegisterUser = require('../users/application/authUser/RegisterUser')
const ForgotPassword = require('../users/application/authUser/ForgotPassword')
const RefreshToken = require('../users/application/authUser/RefreshToken')

const router = Router()
 

//register User
router.post('/register', RegisterUser.RegisteryUser )

//get All Users 
router.post('/login', LoginUser)

router.post('/refresh-token', RefreshToken )

router.post('/forgot-password', ForgotPassword)


module.exports = router