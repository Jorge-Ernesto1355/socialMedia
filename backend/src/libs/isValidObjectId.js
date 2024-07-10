const mongoose = require("mongoose");
const { DocumentNotFound } = require("../handleErros/errors");

module.exports = async function validateObjectId(query, options) {
  try {
    if (typeof options !== "object")
      throw new Error("options is not an object");

    if (!mongoose.models[options?.model])
      throw new Error("model not found");

    const model = mongoose.models[options.model];
    let queryBuilder = model.findOne(query);

    if (options.select) {
      queryBuilder = queryBuilder.select(options.select);
    }

    if (options.populate) {
      if (Array.isArray(options.populate)) {
        options.populate.forEach(populateOption => {
          queryBuilder = queryBuilder.populate(populateOption);
        });
      } else if (typeof options.populate === 'object') {
        queryBuilder = queryBuilder.populate(options.populate);
      }
    }

    const document = await queryBuilder.exec();

    if (!document) throw new DocumentNotFound("document not found");

    return document
  } catch (error) {
    return {
      error,
      message: error.message,
    };
  }
};