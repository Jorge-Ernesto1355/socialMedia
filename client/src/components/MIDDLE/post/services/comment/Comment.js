import { userRequest } from "../../../../../utilities/requestMethod";

const CommentAxios = async (commentToSend) => {
  const form = new FormData();

  for (const key in commentToSend) {
    form.append(key, commentToSend[key]);
  }
  console.log(commentToSend);

  const data = await userRequest.put(
    `/post/comment/${commentToSend.postId}`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  console.log(data);

  return data;
};

export default CommentAxios;
