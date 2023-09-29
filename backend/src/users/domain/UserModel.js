const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const User = new Schema(
  {
    username: {
      type: String,
      require: true,
      min: 5,
      max: 15,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    coverPicture: { url: String, public_id: String },
    friends: {
      type: Array,
      default: [],
    },
    friendsWaiting: {
      type: Array,
      default: [],
    },
    curp: {
      type: String,
      required: true,
    },
    desription: {
      type: String,
      max: 80,
      trim: true,
    },
    posts: [
      {
        ref: "Post",
        type: Schema.Types.ObjectId,
      },
    ],
    imageProfile: {
      url: String,
      public_id: String,
    },
    Admin: { type: Boolean, default: false },
    resetToken: {
      type: String,
      default: "",
    },
    relationShipWaiting: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],

    relationShip: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
        default: ["6273909ca278e8cc7379c54f"],
      },
    ],
    favorites: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

User.plugin(mongoosePaginate);

module.exports = model("User", User);
