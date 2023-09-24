import { userRequest } from "../../../../../utilities/requestMethod";

const getCommentReactions = async ({ id, label, limit, page }) => {
  if (id === null || id === undefined || typeof id !== "string") {
    throw new Error("Invalid commentId");
  }
  try {
    const data = await userRequest.get(
      `/post/reactions/comment/all/${id}?limit=${limit}&page=${page}`,
    );

    return data;
  } catch (error) {
    return error.response;
  }
};

export default getCommentReactions;
