const { Schema, model } = require("mongoose");

const Message = new Schema({});

module.exports = model("Message", Message);
