const {Schema, model} = require('mongoose')

const Comment = Schema({
   comment:{userId:Schema.Types.ObjectId, text:String},
   commentsResponded:[{userId:Schema.Types.ObjectId, text:String}]
})

module.exports = model('Comment', Comment)