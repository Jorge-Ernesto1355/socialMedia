const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Comment = Schema(
  {
    comment: {
      containerId: { type: Schema.Types.ObjectId, require: true },
      userId: { type: Schema.Types.ObjectId, require: true },
      edit: { type: Boolean, default: false },
      text: { type: String, require: true },
      image: { url: String, public_id: String },
      points:{type:Number, default:0}
    },
    reactions: [
      {
        ref: "Reaction",
        type: Schema.Types.ObjectId,
      },
    ],
    commentsResponded: [
      {
        ref: "Comment",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    strictPopulate: false,
    versionKey: false,
  }
);

Comment.plugin(mongoosePaginate);

module.exports = model("Comment", Comment);
