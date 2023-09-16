const {Router} = require('express')
const index = require('../application/index')
const indexAuth = require('../application/authUser/indexAuth')
const DeleteUser = require('../application/Delete/DeleteUserById')
const UpdateUserProfile = require('../application/Update/UpdateUserProfile')
const verifyToken = require('../../auth/application/verifySignup')


const router = Router()


//get All Users 
router.get('/',  index.FindAllUsers)

//get one User

router.get('/:id', index.FindUserById)

//delete User
router.delete('/:id',  DeleteUser )

router.put('/password',indexAuth.NewPassword)

router.put('/friend/acceptfriend', index.AcceptFriends)

router.put('/friend/addfriend', index.addFriend)

//update User
router.put('/:id', UpdateUserProfile)

//uploadImages

router.post('/upload', index.UploadProfilePicture)

router.post('/upload/cover', index.UploadCover)


//relationship


router.put('/relationShip/add', index.AcceptRelationShip)

router.post('/relationShip', index.addRelationShip)

router.delete('/relationShip/del', index.deleteRelationShip)

//roles
router.put('/roles/add', index.giveRoles )

router.delete('/roles/del', index.deleteRoles)

router.get('/userPosts/:userId', index.FindUserPosts)

router.get('/actions/getUsers/:id', index.FindUsersActions)





module.exports = router
