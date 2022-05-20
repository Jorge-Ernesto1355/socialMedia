const {Schema,model} = require('mongoose')


const Post = Schema({
  userId:{type:String},
  description:{ type:String, max:500},
  image:{url:String, public_id:String},
  likes:{type:Array, default:[]},
  comments:[{
     ref:'Comment', 
     type:Schema.Types.ObjectId
  }],
  shares:{type:Array, default:[]}, 
  votes:[
      {
        ref:"Vote", 
        type:Schema.Types.ObjectId, 
        
      }
    ]
})

module.exports = model('Post', Post)