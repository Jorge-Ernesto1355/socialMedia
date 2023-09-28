const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Post = Schema(
  {
    userId: { type: String },
    description: { type: String, max: 500 },
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

    reactions: {
      gusta: [
        {
          ref: "Reaction",
          type: Schema.Types.ObjectId,
        },
      ],
      encanta: [
        {
          ref: "Reaction",
          type: Schema.Types.ObjectId,
        },
      ],
      asombra: [
        {
          ref: "Reaction",
          type: Schema.Types.ObjectId,
        },
      ],
      divierte: [
        {
          ref: "Reaction",
          type: Schema.Types.ObjectId,
        },
      ],
      entristece: [
        {
          ref: "Reaction",
          type: Schema.Types.ObjectId,
        },
      ],
    },
    group: { type: String, default: "" },
    edit: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

Post.plugin(mongoosePaginate);

module.exports = model("Post", Post);
