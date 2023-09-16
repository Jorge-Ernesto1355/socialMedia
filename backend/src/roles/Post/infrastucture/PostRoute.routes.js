const {Router} = require('express')
const PostIndex = require('../application/PostIndex')

const route = Router()


route.get('/',PostIndex.FindAllPost )

route.put('/comment', PostIndex.comment)

route.get('/comment/all/:id', PostIndex.FindCommentsFromPost)

route.post('/', PostIndex.createPost)

route.put('/:id', PostIndex.UpdatePost)

route.put('/action/:id', PostIndex.GiveLike)

route.put('/share/:id', PostIndex.Share)

route.delete('/:id', PostIndex.DeletePost)

route.get('/:id', PostIndex.FindPostById)

route.get('/currentpost/postsfriends',PostIndex.FindCurrentPost)

route.get('/action/shares/all', PostIndex.allShared)

route.put('/votes/add', PostIndex.Votes)

route.get('/votes/all', PostIndex.AllVotes)

route.put('/action/favorite/:postId', PostIndex.favorite)


route.get('/actions/all/:id', PostIndex.actionAll)

route.put('/actions/comment/:id', PostIndex.ActionsComment)

route.get('/actions/comment/all/:id', PostIndex.getAllActionsFormComment)

route.get('/comments/responded/all/:id', PostIndex.getAllCommentsResponded)

route.put('/action/comment/responded/:id', PostIndex.reactToResponded)

route.get('/action/comment/responded/all/:id', PostIndex.getAllActionAndUserFromCommentsResponded)

route.put('/comment/:id', PostIndex.updateComment)

route.put('/comment/responded/:id', PostIndex.updateCommentResponded)


route.delete('/comment/:id', PostIndex.deleteComment)

module.exports = route

