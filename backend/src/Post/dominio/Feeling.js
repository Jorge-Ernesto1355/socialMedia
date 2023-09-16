const {Schema,model} = require('mongoose')


const Feeling  = new Schema({
    feeling:{type:String}
}, {
    versionKey: false,
  })

module.exports = model('Feeling', Feeling)