const {Schema, model} = require('mongoose')

const Vote = Schema({
    counter:[
      {
        ref:"User", 
        type:Schema.Types.ObjectId, 
        
      }
    ],
   uuid:{type:String, required:true}, 
   text:{type:String, required:true, max:20}
})

module.exports = model('Vote', Vote)