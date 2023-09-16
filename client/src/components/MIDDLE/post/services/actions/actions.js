import { userRequest } from '../../../../../utilities/requestMethod';

/// Favorites ///

export const addToFavorite = async (favorite) => {
  let data;
  let error = null;

  try {
    data = await userRequest.put(
      `/post/action/favorite/${favorite.postId}?userId=${favorite.currentUser}`
    );
  } catch (errorCaugthed) {
    error = errorCaugthed;
  }

  return { data, error };
};

/// Share ///

export const addToShare = async (favorite) => {
  let data;
  let error = null;

  try {
    data = await userRequest.put(
      `/post/share/${favorite.postId}?userId=${favorite.currentUser}`
    );
  } catch (errorCaugthed) {
    error = errorCaugthed;
  }

  return { data, error };
};

/// Comment ///

export const Comment = async (favorite) => {
  let data;
  let error = null;

  try {
    data = await userRequest.put(`/post/comment?postId=${favorite.postId}`);
  } catch (errorCaugthed) {
    error = errorCaugthed;
  }

  return { data, error };
};

// Action //

export const ReactionPost = async ({id, userId, toSend}) => {
  let data;
  let error = null;

  try {
    data = await userRequest.put(
      `/post/reaction/${id}?userid=${userId}`,
      toSend
    );
  } catch (errorCaugthed) {
    error = errorCaugthed;
  }

  return { data, error };
};

// Action //

export const GetAllReactions = async ({id, limit, page}) => {
  if (!id || !limit || !page) {
    throw new Error('Missing required input parameters');
  }
  let data;
  let error = null;

  try {
    data = await userRequest.get(`/post/reactions/all/${id}?limit=${limit}&page=${page}`);
  } catch (errorCaugthed) {
    error = errorCaugthed;
  }

  return data;
};



export const getAllCommentsResponded = async ({id}) => {
  console.log(id)
  try {
    const data = await userRequest.get(
      `/post/comments/responded/all/${id}`
    );
    return data;
  } catch (errorCaugthed) {
    return errorCaugthed.response;
  }
};


export const GetReactionsView = async ({id}) => {
  let data;
  let error = null;

  try {
    data = await userRequest.get(`/post/reaction/view/${id}`);

  } catch (errorCaugthed) {
    error = errorCaugthed;
  }

  return data;
};

export const GetReactionsCommentView = async ({id}) => {
  let data;
  let error = null;

  try {
    data = await userRequest.get(`/post/reaction/comment/view/${id}`);

  } catch (errorCaugthed) {
    error = errorCaugthed;
  }

  return data;
};



export const GetReactionsSelected = async ({id, label, limit, page }) => {
  if (!id || !label || !limit || !page) {
    throw new Error('Missing required input parameters');
  }
  let data;
  let error = null;

  try {
    data = await userRequest.get(`/post/reaction/${id}?label=${label}&limit=${limit}&page=${page}`);
  
  } catch (errorCaugthed) {
    error = errorCaugthed;
    data = undefined;
  }

  return data;
};

