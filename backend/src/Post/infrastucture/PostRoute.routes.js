const {Router} = require('express')
const PostIndex = require('../application/PostIndex')

const route = Router()


route.get('/',PostIndex.FindAllPost )


route.put('/comment', PostIndex.comment)

route.post('/', PostIndex.createPost)

route.put('/:id', PostIndex.UpdatePost)

route.put('/like/:id', PostIndex.GiveLike)

route.put('/share/:id', PostIndex.Share)

route.delete('/:id', PostIndex.DeletePost)

route.get('/:id', PostIndex.FindPostById)

route.get('/currentpost/postsfriends',PostIndex.FindCurrentPost)

route.get('/likes/all',PostIndex.allUsersHasGivenLiked )

route.get('/shares/all', PostIndex.allShared)

route.put('/votes/add', PostIndex.Votes)

route.get('/votes/all', PostIndex.AllVotes)

module.exports = route

