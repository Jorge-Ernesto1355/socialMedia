import { userRequest } from "../utilities/requestMethod";

const GetPostById = async (postId) => {
  let data;
  let error = null;

  try {
    data = await userRequest.get("/post/" + postId);
  } catch (cathedError) {
    error = cathedError.response.data.message;
  }

  if (data === undefined) {
    data = { description: "" };
  }

  return { data, error };
};

export default GetPostById;
