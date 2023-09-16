const {Schema, model} = require('mongoose')

const ActionComment = Schema({
   label:{type:String},
   user:{
    userId:Schema.Types.ObjectId, 
    username:String,
    imageProfile:{
      url:String,
      public_id:String
    },
   }
},{
   strictPopulate:false,
    versionKey: false,
})

module.exports = model('ActionComment', ActionComment)