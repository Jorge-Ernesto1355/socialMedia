import { ObjectErrosName } from "../../../utilities/ObjectErrorsName";

export class NotificationService {
  static async getAll(object) {
    try {
      if (!object) throw new Error("parameters not found");
      const { id: userId, limit, page, privateRequest } = object;
      return await privateRequest.get(
        `/notification/${userId}?limit=${limit}&page=${page}`,
      );
    } catch (error) {
      return error;
    }
  }

  static async subscription({ privateRequest, subscription }) {
    try {
      if (!privateRequest)
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);

      if (!subscription) throw new Error(ObjectErrosName.incompleteParams);
      const response = await privateRequest.post(
        "notification/subscription",
        JSON.stringify(subscription),
      );
      return response?.data;
    } catch (error) {
      return error;
    }
  }
}
