const {Schema, model} = require('mongoose')

const Comment = Schema({
   comment:{
     containerId:{type:Schema.Types.ObjectId },
      userId:{type:Schema.Types.ObjectId, require:true},
      edit:{type:Boolean, default:false},
      text:{type:String, require:true},
      image:{url:String, public_id:String},
      actions:[
      {
        ref:"ActionComment", 
        type:Schema.Types.ObjectId, 
        
      }]},
  

   commentsResponded:
   [{userId:{ ref:"User", type:Schema.Types.ObjectId, require:true},
    edit:{type:Boolean, default:false},
    text:{type:String, default:""},
    image:{url:String, public_id:String},
    actions:
    [
      {
        ref:"ActionComment", 
        type:Schema.Types.ObjectId, 
        
      }
    ],
  }]
    
},{
    timestamps:true, 
  strictPopulate:false, 
     versionKey: false,
})

module.exports = model('Comment', Comment)