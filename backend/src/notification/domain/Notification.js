const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Notification = Schema(
  {
    label: { type: String },
    userReceptor: { ref: "User", type: Schema.Types.ObjectId },
    userConector: { ref: "User", type: Schema.Types.ObjectId },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

Notification.plugin(mongoosePaginate);

module.exports = model("Notification", Notification);
