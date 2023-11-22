const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Conversation = new Schema({
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  block: { type: Boolean, default: false },
});

Conversation.plugin(mongoosePaginate);

module.exports = model("Conversation", Conversation);
