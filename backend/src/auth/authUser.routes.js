const {Router} = require('express')
const indexAuth = require('./indexAuth')

const router = Router()
 

//register User
router.post('/register', indexAuth.Register)

//get All Users 
router.post('/login', indexAuth.LoginUser)

router.put('/refresh', indexAuth.refresh )

router.post('/forgot-password', indexAuth.ForgotPassword)


module.exports = router