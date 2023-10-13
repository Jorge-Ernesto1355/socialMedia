module.exports = class MessageService {
  static async messages(object) {
    try {
      exits(object);
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async create(object) {
    try {
      exits(object);
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async delete(object) {
    try {
      exits(object);
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async update(object) {
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
