import { userRequest } from '../../../../../utilities/requestMethod';

const UpdateCommentResponded = async (commentToSend) => {
  const data = await userRequest.put(
    `/post/comment/responded/${commentToSend.commentId}?commentResponded=${commentToSend.commentsRespondedId}`,
    commentToSend
  );
  console.log(data);
  return data;
};

export default UpdateCommentResponded;
