const {Router} = require('express')
const DeleteUser = require('../application/Delete/DeleteUserById')
const FindAllUsers = require('../application/find/FindAllUsers')
const FindUserById = require('../application/find/FindUserById')
const updateUserProfile = require('../application/Update/UpdateUserProfile')
const NewPassword = require('../application/authUser/NewPassword')
const verifyToken = require('../../auth/application/verifySignup')
const router = Router()


//get All Users 
router.get('/', FindAllUsers)

//get one User

router.get('/:id', FindUserById)

//delete User
router.delete('/:id',  DeleteUser )

router.put('/password', NewPassword)

//update User
router.put('/:id', updateUserProfile)



module.exports = router
