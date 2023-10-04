module.exports = function verifyExistingUser(reactions, userId) {
  try {
    if (!Array.isArray(reactions) || reactions.length === 0) {
      return {
        exitsUserId: false,
        reaction: {},
      };
    }

    const exitsUserId = reactions.find(
      (reaccion) => reaccion.user.userId == userId
    );
    if (exitsUserId)
      return {
        exitsUserId: exitsUserId.user.userId,
        reaction: exitsUserId,
      };
    if (!exitsUserId) {
      return {
        exitsUserId: false,
        reaction: {},
      };
    }
  } catch (error) {
    return {
      error,
      message: error.message,
    };
  }
};
