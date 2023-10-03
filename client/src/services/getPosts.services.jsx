import { userRequest } from "../utilities/requestMethod";

export const GetPosts = async ({ limit, page }) => {
  try {
    return await userRequest.get(`/post?limit=${limit}&page=${page}`);
  } catch (error) {
    return error;
  }
};

export const getTimeLine = async({limit, page, id})=>{

  try {
    return await userRequest.get(`/post/timeline/${id}`)
  } catch (error) {
    return error
  }

}




