const { Schema, model, trusted } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Notification = Schema(
  {
    type: String, 
    sender: {ref: "User", type: Schema.Types.ObjectId}, 
    receiver: {ref: "User", type: Schema.Types.ObjectId}, 
    message: String,     
    containerId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'containerModel' 
    },
    containerModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']  
       },
    read: { type: Boolean, default: false }
    
  },
  {
    timestamps: true,
  }
);

Notification.plugin(mongoosePaginate);

module.exports = model("Notification", Notification);
