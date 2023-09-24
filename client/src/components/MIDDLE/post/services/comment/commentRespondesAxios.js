import { userRequest } from "../../../../../utilities/requestMethod";

const commentRespondedAxios = async (commentToSend) => {
  const form = new FormData();

  for (const key in commentToSend) {
    form.append(key, commentToSend[key]);
  }

  const data = await userRequest.put(
    `/post/comment/${commentToSend.postId}?commentId=${commentToSend.commentId}`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};

export default commentRespondedAxios;
