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
    ], 
  feeling:{
    ref:"Feeling", 
    type:Schema.Types.ObjectId
  }, 
  postShared:{ref:'Post', type:Schema.Types.ObjectId}, 

 actions:[
      {
        ref:"Action", 
        type:Schema.Types.ObjectId, 
        
      }
    ], 
  group:{type:String, default:""}, 
  edit:{type:Boolean, default:false}

}, {
   timestamps:true
})

module.exports = model('Post', Post)