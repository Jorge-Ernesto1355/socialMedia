import { userRequest } from '../utilities/requestMethod';

const FindAllUserPost = async (userId) => {
  let data = {};
  let error = null;

  try {
    data = await userRequest.get('/users/userPosts/' + userId);
  } catch (caughtedError) {
    error = caughtedError;
  }

  return { data, error };
};

export default FindAllUserPost;
