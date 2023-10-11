import useUserRequest from "../hooks/auth/useUserRequest";

export const GetPosts = async ({ limit, page,privateRequest }) => {
 
  try {
    const response = await privateRequest.get(`/post?limit=${limit}&page=${page}`);
    return response
  } catch (error) {
    return error;
  }
};

export const getTimeLine = async ({ limit, page, id }) => {

  try {
    const userRequest = useUserRequest()
    return await userRequest.get(`/post/timeline/${id}`)
  } catch (error) {
    return error
  }

}




