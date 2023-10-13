const exits = require("../libs/exits");

module.exports = class ConversationService {
  static async conversations(object) {
    try {
      exits(object);
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async conversation(object) {
    try {
      exits(object);
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
};
