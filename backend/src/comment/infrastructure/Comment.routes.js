const { Router } = require("express");
const router = Router()
const index = require('../index')



//mutation
router.post('/:containerId/:type', index.mutation.Comment)

router.delete('/:commentId', index.mutation.CommentDelete)

router.put('/:commentId', index.mutation.updateComment)

// query
router.get('/all/:containerId/:type', index.query.getComments)

router.get('/:commentId/commentsResponded', index.query.getCommentResponded)



module.exports = router


