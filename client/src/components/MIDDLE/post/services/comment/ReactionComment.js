// ActionForComment//

import { userRequest } from '../../../../../utilities/requestMethod';

export const ReactionComment = async ({id, userId, toSend}) => {
  let data;
  let error = null;

  try {
    data = await userRequest.put(
      `/post/reaction/comment/${id}?userid=${userId}`,
      toSend
    );
  } catch (errorCaugthed) {
    error = errorCaugthed;
  }

  return { data, error };
};
