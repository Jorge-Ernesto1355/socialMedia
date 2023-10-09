const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Notification = Schema(
  {
    label: { type: String },
    userReceptor: {
      username: String,
      userId: Schema.Types.ObjectId,
      imageProfile: {
        url: String,
        public_id: String,
      },
    },
    userConnector: {
      username: String,
      userId: Schema.Types.ObjectId,
      imageProfile: {
        url: String,
        public_id: String,
      },
    },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

Notification.plugin(mongoosePaginate);

module.exports = model("Notification", Notification);
