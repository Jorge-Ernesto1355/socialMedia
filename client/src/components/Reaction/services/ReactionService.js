class ReactionService {
  static async React({ privateRequest, label, id: containerId, type }) {
    if (!privateRequest) {
      throw new Error("could not load the requestsfsd");
    }

    try {
      return privateRequest?.put(`/reaction/${containerId}`, {
        label,
        userId: "6526cc1dfea9a75e4cf0e049",
        type,
      });
    } catch (error) {
      return error;
    }
  }

  static async reactionView({ privateRequest, id: containerId, type }) {
    if (!privateRequest) throw new Error("could not load the request");
    try {
      return privateRequest.get(`/reaction/view/${containerId}/${type}`);
    } catch (error) {
      return error;
    }
  }

  static async getReactions({
    privateRequest,
    id: containerId,
    type,
    limit,
    page,
  }) {
    if (!privateRequest) throw new Error("could not load the request");
    try {
      return privateRequest?.get(
        `/reaction/all/${containerId}/${type}?limit=${limit}&page=${page}`,
      );
    } catch (error) {
      return error;
    }
  }

  static async getReaction({
    privateRequest,
    id: containerId,
    type,
    limit,
    page,
    label,
  }) {
    if (!privateRequest) throw new Error("could not load the request");

    try {
      return privateRequest?.get(
        `/reaction/${containerId}/${type}?label=${label}&limit=${limit}&page=${page}`,
      );
    } catch (error) {
      return error;
    }
  }
}

export default ReactionService;
