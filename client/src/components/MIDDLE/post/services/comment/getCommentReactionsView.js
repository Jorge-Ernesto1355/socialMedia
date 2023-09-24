import { userRequest } from "../../../../../utilities/requestMethod";

const getCommentReactionsView = async ({ id }) => {
  if (id === null || id === undefined || typeof id !== "string") {
    throw new Error("Invalid commentId");
  }

  try {
    const data = await userRequest.get(`/post/reaction/comment/view/${id}`);

    return data;
  } catch (error) {
    return error.response;
  }
};

export default getCommentReactionsView;
