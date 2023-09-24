const {Router} = require('express')
const PostIndex = require('../application/PostIndex')

const route = Router()


route.get('/',PostIndex.FindAllPost )

route.put('/comment/:postId', PostIndex.comment)

route.get('/comment/all/:id', PostIndex.FindCommentsFromPost)

route.post('/', PostIndex.createPost)

route.put('/:id', PostIndex.UpdatePost)

route.put('/reaction/:id', PostIndex.GiveLike)

route.put('/share/:id', PostIndex.Share)

route.delete('/:id', PostIndex.DeletePost)

route.get('/:id', PostIndex.FindPostById)

route.get('/currentpost/postsfriends',PostIndex.FindCurrentPost)

route.get('/action/shares/all', PostIndex.allShared)

route.put('/votes/add', PostIndex.Votes)

route.get('/votes/all', PostIndex.AllVotes)

route.put('/reaction/favorite/:postId', PostIndex.favorite)


route.get('/reactions/all/:id', PostIndex.FindAllReactionsPost)

route.get('/reaction/view/:id', PostIndex.FindReactionPostView)

route.get('/reaction/:id', PostIndex.FindReactionPost)

route.put('/reaction/comment/:id', PostIndex.ActionsComment)

route.get('/reactions/comment/all/:id', PostIndex.getReactionsComment)

route.get('/reaction/comment/:id', PostIndex.getReactionComment)

route.get('/reaction/comment/view/:id', PostIndex.getReactionCommentView)

route.get('/comments/responded/all/:id', PostIndex.getAllCommentsResponded)


route.put('/comment/:id', PostIndex.updateComment)




route.delete('/comment/:id', PostIndex.deleteComment)

module.exports = route

