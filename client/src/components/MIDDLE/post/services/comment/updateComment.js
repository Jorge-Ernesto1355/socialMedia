import { userRequest } from "../../../../../utilities/requestMethod";

const UpdateComment = async (commentToSend) => {
  const data = await userRequest.put(
    `/post/comment/${commentToSend.commentId}`,
    commentToSend,
  );

  return data;
};

export default UpdateComment;
