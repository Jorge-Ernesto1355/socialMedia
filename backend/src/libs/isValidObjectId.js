const mongoose = require("mongoose");

module.exports = async function validateObjectId(id, model) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("objectId is not valid");
    }
    const document = await model.findById(id);

    if (!document) throw new Error("document not found");
  } catch (error) {
    return {
      error,
      message: error.message,
    };
  }
};
