import { userRequest } from "../utilities/requestMethod";

const GetPosts = async ({ limit, page }) => {
  try {
    return await userRequest.get(`/post?limit=${limit}&page=${page}`);
  } catch (error) {
    return error;
  }
};

export default GetPosts;
