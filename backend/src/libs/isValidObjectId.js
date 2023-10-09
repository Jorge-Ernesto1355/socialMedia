const mongoose = require("mongoose");

module.exports = async function validateObjectId(id, modelName) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("objectId is not valid");
    }

    if (!mongoose.models[modelName]) throw new Error("model not found");

    const document = await mongoose.models[modelName].findById(id);
    if (document) return document;
    if (!document) throw new Error("document not found");
  } catch (error) {
    return {
      error,
      message: error.message,
    };
  }
};
