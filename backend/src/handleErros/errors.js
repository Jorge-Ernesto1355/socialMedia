const createFactoyError = function (name) {
  return class Business extends Error {
    constructor(message) {
      super(message);
      this.name = name;
    }
  };
};

const DocumentNotFound = createFactoyError("DocumentNotFound");

module.exports = {
  DocumentNotFound,
};
