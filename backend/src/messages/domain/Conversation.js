const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");
const Conversation = new Schema({
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = model("Conversation", Conversation);
