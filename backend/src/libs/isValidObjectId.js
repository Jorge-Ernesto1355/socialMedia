const mongoose = require("mongoose");

module.exports = async function validateObjectId(query, options) {
  try {
   

    if(typeof options !== 'object') throw new Error('options is not an object')
   
    if (!mongoose.models[options.model]) throw new Error("model not found");

    const document = await mongoose.models[options.model].findOne(query).select(options.select)

    if (document) return document;

    if (!document) throw new Error("document not found");
  } catch (error) {
    return {
      error,
      message: error.message, 
    };
  }
}