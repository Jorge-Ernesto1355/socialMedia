const createErrorFactorry = function (name) {
  return class BusinessError extends Error {
    constructor(message) {
      super(message);
      this.name = name;
    }
  };
};
