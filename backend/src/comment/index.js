

//mutation
const Comment = require('./application/mutation/Comment')
const CommentDelete = require('./application/mutation/deleteComment')
const updateComment = require('./application/mutation/updateComment')

// query
const getComments = require('./application/query/getComments')
const getCommentResponded = require('./application/query/getCommentsResponded')




module.exports = {
    mutation:{
        Comment, 
        CommentDelete, 
        updateComment
    }, 
    query:{
        getComments, 
        getCommentResponded
    }
}
