import { userRequest } from '../../../../../utilities/requestMethod';

const CommentAxios = async (commentToSend) => {
  const form = new FormData();
  
  for (let key in commentToSend) {
    form.append(key, commentToSend[key]);
  }

  const data = await userRequest.put(
    '/post/comment?postId=' + commentToSend.postId,
    form,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  console.log(data);

  return data;
};

export default CommentAxios;
