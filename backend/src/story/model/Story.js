const  {  Schema, model } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2");

const Story = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    media: { url: {type: String}, previewUrl: {type: String}, public_id: {type: String} }, // URL to media file if any
    createdAt: { type: Date, default: Date.now },
    expiresIn: { type: Number, default: 86400 }
})

Story.index({ createdAt: 1 }, { expireAfterSeconds: 'expiresIn' });

Story.plugin(mongoosePaginate)

module.exports = model("Story", Story);