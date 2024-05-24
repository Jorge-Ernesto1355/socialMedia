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

  static async addFriend({ userId, addUserId, privateRequest }) {
    return this.Request({
      privateRequest,
      endpoint: `/users/friend/add/${userId}?addUserId=${addUserId}`,
      method: "put",
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
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.put(
        `/users/friend/accept/${userId}?addUserId=${addUserId}&accept=${accept}`,
      );
    } catch (error) {
      return error;
    }
  }

  static async usersOnline({ id, privateRequest, limit, page }) {
    return this.Request({
      privateRequest,
      endpoint: `/users/online/${id}`,
      method: "get",
      params: { limit, page },
    });
  }

  static async hidePost({privateRequest, userId, postId}){
    try {
    
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.put(
        `/users/hide/post/${postId}/${userId}`,
      );
    } catch (error) {
      return error;
    }
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

  static async hideAllPosts({privateRequest, userId, userIdToHide}){
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.put(
        `/users/hide/all/post/${userId}/${userIdToHide}`,
      );
    } catch (error) {
      return error;
    }
  }

  static async report({privateRequest, userId, postId}){
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.put(
        `/users/report/post/${postId}?userId=${userId}`,
      );
    } catch (error) {
      return error;
    }
  }

  
  static async unFollow({privateRequest, userId, friendId}){
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      return privateRequest.put(
        `/users/unFollow/${userId}/${friendId}`,
      );
    } catch (error) {
      return error;
    }
  }

}
