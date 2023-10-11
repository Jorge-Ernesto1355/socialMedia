const { Schema,  model } = require("mongoose");


const TokenModel = new Schema({
    id:{type: Object}, 
    token:{type: String, require:true}

})

module.exports = model('Token', TokenModel)