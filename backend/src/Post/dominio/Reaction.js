const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Reaction = Schema(
  {
    label: { type: String },
    value: { type: Number, max: 10 },
    containerId: { type: Schema.Types.ObjectId },
    user: {
      userId: Schema.Types.ObjectId,
      username: String,
      imageProfile: {
        url: String,
        public_id: String,
      },
    },
  },
  {
    strictPopulate: false,
    versionKey: false,
  }
);

Reaction.plugin(mongoosePaginate);
module.exports = model("Reaction", Reaction);
