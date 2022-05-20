const {Schema, model} = require('mongoose')



const Role = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

module.exports = model("Role", Role);