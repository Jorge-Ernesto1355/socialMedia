/* eslint-disable lines-between-class-members */
import { ObjectErrosName } from "../../../../../utilities/ObjectErrorsName";

export default class ConversationService {
  static async Conversations({ privateRequest, id: userId }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return await privateRequest.get(`/conversation/all/${userId}`);
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

  static async Conversation({ privateRequest, id: conversationId }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return await privateRequest.get(`/conversation/one/${conversationId}`);
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async blockContact({ privateRequest, id: conversationId }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return await privateRequest.put(`/conversation/block/${conversationId}`);
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async getUnReadConversations({ privateRequest, id: conversationId }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return await privateRequest.get(
        `/conversation/unReadConversations/${conversationId}`,
      );
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
}
