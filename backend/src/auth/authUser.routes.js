const {Router} = require('express')
const {body} = require('express-validator')
 
const indexAuth = require('../users/application/authUser/indexAuth')
const RefreshToken = require('../auth/application/RefreshToken')


const router = Router()
 

//register User
router.post('/register', indexAuth.RegisterUser )

//get All Users 
router.post('/login', indexAuth.LoginUser)

router.post('/refresh-token', RefreshToken )

router.post('/forgot-password', indexAuth.ForgotPassword)


module.exports = router