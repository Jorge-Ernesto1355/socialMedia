const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { AccessToken, RefreshToken } = require("../../auth/application/auth");
const getUserInfo = require("../../libs/getUserInfo");


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
    forbiddenFavorites: {type: Boolean, default: false},
    forbiddenReactions: {type: Boolean, default: false},
    bio: {
      type:String, 
      max: 100, 
      min: 10, 
      trim:true
    },
    interests: [String],
    coverPicture: { url: String, public_id: String, previewUrl: String },
    friends: {
      type: Array,
      default: [],
    },
    friendsWaiting: {
      type: Array,
      default: [],
    },
    state: {type: String, max: 20}, 
    city: {type: String, max: 20},
    country: {type: String, max: 20},
    workAt: {type:String, max: 30},
    desription: {
      type: String,
      max: 80,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'], // 'location.type' debe ser 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
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
      previewUrl: String
    },
    Admin: { type: Boolean, default: false },
    refreshToken: {
      type: String,
      default: "",
    },
    relationShipWaiting: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],
    reactionsPosts: [{
      post: {ref: "Post", type: Schema.Types.ObjectId}, 
      reaction: {ref: "Reaction", type: Schema.Types.ObjectId}
    }], 
    relationShip: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],
    phone: {type: Number},
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
        default: ["6273909ca278e8cc7379c54f"],
      },
    ],
    favorites: { type: Array, default: [] },
    socketId: { type: String },
    status: {
      type: String,
      enum: ["Online", "Offline"],
    },
    usersPostHidden: [
      {
        ref: "User", 
      type: Schema.Types.ObjectId
      }
    ],
    postsHiden: [
       {
        ref: "Post", 
        type: Schema.Types.ObjectId
       }
    ],
    stories: [
      {
        ref: "Story",
        type: Schema.Types.ObjectId 

      }
    ]
  },
  {
    timestamps: true,
  }
);


User.index({location: "2dsphere"})

User.plugin(mongoosePaginate);

User.methods.createAccessToken = function () {
  return AccessToken(getUserInfo(this));
};

User.methods.createRefreshToken = async function () {
  try {
    const refreshToken = RefreshToken(getUserInfo(this));

    this.refreshToken = refreshToken;
    await this.save();
    return refreshToken;
  } catch (error) {
    return { error, message: error.message };
  }
};

module.exports = model("User", User);
