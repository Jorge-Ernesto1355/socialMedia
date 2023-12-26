import { ObjectErrosName } from "../utilities/ObjectErrorsName";

export default class UserService {
  static async Request({ privateRequest, endpoint, method, params }) {
    try {
      if (!privateRequest) {
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      }

      const response = await privateRequest[method.toLowerCase()](endpoint, {
        ...(method.toLowerCase() === "get" ? { params } : params),
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async getUser({ privateRequest, userId, options }) {
    return this.Request({
      privateRequest,
      endpoint: `/users/${userId}`,
      method: "post",
      params: { options },
    });
  }

  static async requestFriends({ privateRequest, id, limit, page }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.get(
        `/users/friend/request/all/${id}?limit=${limit}&page=${page}`,
      );
    } catch (error) {
      return error;
    }
  }

  static async acceptFriend({ userId, addUserId, accept, privateRequest }) {
    return this.Request({
      privateRequest,
      endpoint: `/users/friend/accept/${userId}`,
      method: "put",
      params: { addUserId, accept },
    });
  }

  static async usersOnline({ id, privateRequest, limit, page }) {
    return this.Request({
      privateRequest,
      endpoint: `/users/online/${id}`,
      method: "get",
      params: { limit, page },
    });
  }

  static async addFriend({ userId, addUserId, privateRequest }) {
    return this.Request({
      privateRequest,
      endpoint: `/users/friend/add/${userId}`,
      method: "put",
      params: { addUserId },
    });
  }

  static async getFriends({ privateRequest, id, limit, page }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.get(
        `/users/friends/${id}?limit=${limit}&page=${page}`,
      );
    } catch (error) {
      return error;
    }
  }
}
