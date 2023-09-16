const {Schema, model} = require('mongoose')

const ActionComment = Schema({
   label:{type:String},
   userId:{
    ref:'User', 
    type:Schema.Types.ObjectId
   }
},{
   strictPopulate:false,
    versionKey: false,
})

module.exports = model('ActionComment', ActionComment)