import { userRequest } from '../../../../../utilities/requestMethod';

const GetComments = async ({id}) => {
  if (!id) {
    throw new Error('Invalid id');
  }

  try {
    const response = await userRequest.get(`/post/comment/all/${id}`);
    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Request failed with status code ' + response.status);
    }
  } catch (error) {
    throw new Error(error.response);
  }
};



export default GetComments;
