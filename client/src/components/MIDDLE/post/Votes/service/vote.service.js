import { userRequest } from "../../../../../utilities/requestMethod";

const voteService = async ({ userId, postId, voteId }) => {
  try {
    return userRequest.put(
      `/post/votes/add?userId=${userId}&postId=${postId}&voteId=${voteId}`,
    );
  } catch (error) {
    return error;
  }
};

export default voteService;
