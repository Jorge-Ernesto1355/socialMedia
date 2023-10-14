const mongoose = require("mongoose");

module.exports = async function validateObjectId(query, options) {
module.exports = async function validateObjectId(query, options) {
  try {
   

    if(typeof options !== 'object') throw new Error('options is not an object')
   
    if (!mongoose.models[modelName]) throw new Error("model not found");

    const document = await mongoose.models[modelName].findOne(options);

    if (document) return document;

    if (!document) throw new Error("document not found");
  } catch (error) {
    return {
      error,
      message: error.message, 
    };
  }
};
