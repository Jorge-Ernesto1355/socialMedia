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
        `/message/lastMessage/${conversationId}`,
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
      return await privateRequest.get(`message/unRead/${conversationId}?userId=${userId}`);
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

  static async createMessage(message) {
    try {
      if (!message?.privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);

      const form = new FormData();

      for (const key in message) {
        form.append(key, message[key]);
      }

      const data = await message?.privateRequest.post("/message", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  static async readMessages({ privateRequest, userId, conversationId }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return await privateRequest.get(
        `message/read/${conversationId}?userId=${userId}`,
      );
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
}
