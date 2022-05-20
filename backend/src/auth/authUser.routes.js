const {Router} = require('express')
const {body, validationResult} = require('express-validator')
 
const indexAuth = require('../users/application/authUser/indexAuth')
const RefreshToken = require('../auth/application/RefreshToken')


const router = Router()
 

//register User
router.post('/register',[
body('username', 'ingrese un nombre')
  .exists()
  ,
body('username', 'ingrese un nombre de al menos 5 caracteres')
  .isLength({min:5}),
body('email', 'ingrese un email valido')
  .exists()
  .isEmail(),
body('password', 'ingrese una contraseña')
  .exists()
  ,
body('password', 'que sea mayor a 8 caracteres')
  .isLength({min:8}),


], indexAuth.RegisterUser )

//get All Users 
router.post('/login',[
body('username', 'ingrese un nombre')
  .exists()
  ,
body('username', 'ingrese un nombre de al menos 5 caracteres')
  .isLength({min:5}),
body('email', 'ingrese un email valido')
  .exists()
  .isEmail(),
body('password', 'ingrese una contraseña')
  .exists()
  ,
body('password', 'ingrese una contraseña que sea mayor a 8 caracteres')
  .isLength({min:8}),


], indexAuth.LoginUser)

router.post('/refresh-token', RefreshToken )

router.post('/forgot-password', indexAuth.ForgotPassword)


module.exports = router