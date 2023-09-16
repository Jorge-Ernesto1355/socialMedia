const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Comment = Schema({
   comment:{
      userId:{type:Schema.Types.ObjectId, require:true},
      edit:{type:Boolean, default:false},
      text:{type:String, require:true},
      image:{url:String, public_id:String},
      reactions:{
        gusta:[
          {
            ref:"Reaction", 
            type:Schema.Types.ObjectId, 
            
          }
        ], 
        encanta:[
          {
            ref:"Reaction", 
            type:Schema.Types.ObjectId, 
            
          }
        ], 
        asombra:[
          {
            ref:"Reaction", 
            type:Schema.Types.ObjectId, 
            
          }
        ], 
        divierte:[
          {
            ref:"Reaction", 
            type:Schema.Types.ObjectId, 
            
          }
        ],
         entristece:[
          {
            ref:"Reaction", 
            type:Schema.Types.ObjectId, 
            
          }
         ]
    
      }},
  

   commentsResponded:[
    {
      ref:'Comment', 
      type:Schema.Types.ObjectId
    }
   ]
   
    
},{
    timestamps:true, 
  strictPopulate:false, 
     versionKey: false,
})

Comment.plugin(mongoosePaginate)

module.exports = model('Comment', Comment)