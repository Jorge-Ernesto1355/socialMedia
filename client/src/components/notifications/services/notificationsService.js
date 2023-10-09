import { userRequest } from "../../../utilities/requestMethod";

export class NotificationService {
  static async getAll(object) {
    try {
      if (!object) throw new Error("parameters not found");
      const { id: userId, limit, page } = object;

      return await userRequest.get(
        `/notification/${userId}?limit=${limit}&page=${page}`,
      );
    } catch (error) {
      return error;
    }
  }
}
