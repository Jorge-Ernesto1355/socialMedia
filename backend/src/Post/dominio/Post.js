const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Post = Schema(
  {
    userId: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    description: { type: String, max: 300 },
    image: { url: String, public_id: String },
    comments: [
      {
        ref: "Comment",
        type: Schema.Types.ObjectId,
      },
    ],
    shares: { type: Array, default: [] },
    votes: [
      {
        ref: "Vote",
        type: Schema.Types.ObjectId,
      },
    ],
    postShared: { ref: "Post", type: Schema.Types.ObjectId },
    reactions: [
      {
        ref: "Reaction",
        type: Schema.Types.ObjectId,
      },
    ],
    group: { type: String, default: "" },
    edit: { type: Boolean, default: false },
    points:{type:Number, default:0}
  },
  {
    timestamps: true,
  }
);

Post.plugin(mongoosePaginate);

module.exports = model("Post", Post);
