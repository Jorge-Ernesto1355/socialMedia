const {Schema, model} = require('mongoose')

const Action = Schema({
   label:{type:String},
   userId:{type:Schema.Types.ObjectId}
},{
    versionKey: false,
})

module.exports = model('Action', Action)