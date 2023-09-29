
import { userRequest } from "../../../../utilities/requestMethod";

const RequestFriendsService = async  ({ id, limit, page }) => {
  
  try {
    const data = await userRequest.get(
      `/users/friend/request/all/${id}?limit=${limit}&page=${page}`,
    );
   
    return data
  } catch (error) {
    return error;
  }
};

export default RequestFriendsService;
