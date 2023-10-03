import { userRequest } from "../../../../utilities/requestMethod";

export const addFriend = async ({ userId, addUser }) => {
  try {
    return userRequest.put(
      `users/friend/add?userId=${userId}&addUser=${addUser}`,
    );
  } catch (error) {
    return error;
  }
};
