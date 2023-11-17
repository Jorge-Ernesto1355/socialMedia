import { ObjectErrosName } from "../../../../../utilities/ObjectErrorsName";

export default class messageService {
  static async messages({ privateRequest, limit, page, id: conversationId }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return await privateRequest?.get(
        `/message/all/${conversationId}?limit=${limit}&page=${page}`,
      );
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async lastMessage({ privateRequest, id: conversationId }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return await privateRequest?.get(
        `/message/${conversationId}/lastMessage`,
      );
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async unReadMessages({ privateRequest, conversationId, userId }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return await privateRequest.get(
        `conversation/${conversationId}/${userId}`,
      );
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async getMessage({ privateRequest, id }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return await privateRequest.get(`message/${id}`);
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
}
