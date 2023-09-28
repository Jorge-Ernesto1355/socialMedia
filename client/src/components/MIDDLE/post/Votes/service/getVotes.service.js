import { userRequest } from "../../../../../utilities/requestMethod";

const getVotes = async ({ id }) => {
  try {
    return userRequest.get(`/post/votes/${id}`);
  } catch (error) {}
};

export default getVotes;
