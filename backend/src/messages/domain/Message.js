const { Schema, model, default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Message = new Schema(
  {
    conversationId: {
      type: mongoose.Schema.ObjectId,
      ref: "Conversation",
    },
    to: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    from: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["Text", "Media", "Document", "Link"],
    },
    text: {
      type: String,
    },
    file: {
      url: String,
      public_id: String,
    },
    postId: {
      ref: "Post",
      default: null,
      type: Schema.Types.ObjectId,
    },

    readBy: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],
    reply: {
      ref: "Message",
      type: Schema.Types.ObjectId,
    },
    reactions: [
      {
        ref: "Reaction",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

Message.plugin(mongoosePaginate);

module.exports = model("Message", Message);
