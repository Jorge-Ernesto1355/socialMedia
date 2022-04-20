const {Schema,model} = require('mongoose')


const Post = Schema({
  userId:{type:String},
  descripcion:{ type:String, max:500},
  img:{url:String, public_id:String},
  likes:{types:Array, default:[]},
  Comments:[{
      comment:String,
      commentsResponded:[String]
  }],
  compartidas:{type:Number, default:0}
  
})

module.exports = model('Post', Post)