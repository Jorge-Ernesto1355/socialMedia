const  {  Schema, model } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2");

const Story = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    media: { url: String, previewUrl:  String, public_id: String, resourceType: String, background: String }, // URL to media file if any
    createdAt: { type: Date, default: Date.now },
    expiresIn: { 
        type: Date, 
        index: { expires: 0 }, 
        default: null 
      }, 
    hashTags:[String]
})


Story.plugin(mongoosePaginate)

module.exports = model("Story", Story);