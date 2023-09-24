import { userRequest } from "../utilities/requestMethod";

const GetUser = async (userId) => {
  let data;
  let error = null;

  try {
    data = await userRequest.get("/users/" + userId);
  } catch (cathedError) {
    error = cathedError.response.data;
  }

  return { data, error };
};

export default GetUser;
