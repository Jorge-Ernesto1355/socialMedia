import { ObjectErrosName } from "../../../../../utilities/ObjectErrorsName";

export default class ConversationService {
  static async Conversations({ privateRequest, id: userId }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return await privateRequest.get(`/conversation/${userId}`);
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
      return await privateRequest.get(`/message/${conversationId}/lastMessage`);
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
}
