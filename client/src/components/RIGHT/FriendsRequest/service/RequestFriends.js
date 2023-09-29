import React from "react";
import { userRequest } from "../../../../utilities/requestMethod";

const RequestFriendsService = ({ id, limit, page }) => {
  try {
    return userRequest.get(
      `/users/friend/request/all/${id}?limit=${limit}&page=${page}`,
    );
  } catch (error) {
    return error;
  }
};

export default RequestFriendsService;
