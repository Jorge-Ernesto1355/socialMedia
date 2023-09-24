import { userRequest } from "../../../../../utilities/requestMethod";

export const EditPost = async (post, infoRequest) => {
  const form = new FormData();

  for (const key in post) {
    form.append(key, post[key]);
  }

  const data = await userRequest.put(
    `/post/${post.postId}?userId=${post.currentUser}`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};

export const DeletePost = async (post) => {
  const data = await userRequest.delete(
    `/post/${post.postId}?userId=${post.currentUser}`,
  );

  return data;
};

export const VotePost = async (post) => {
  if (post?.previousVote) {
    const data = await userRequest.put(
      `/post/votes/add?postId=${post.postId}&userId=${post.currentUser}&voteId=${post.voteId}&previousVote=${post.previousVote}`,
    );

    return data;
  } else {
    const data = await userRequest.put(
      `/post/votes/add?postId=${post.postId}&userId=${post.currentUser}&voteId=${post.voteId}`,
    );

    return data;
  }
};

export const GetAllPostsShared = async (postId) => {
  const data = await userRequest.get(
    `/post/action/shares/all?postId=${postId}`,
  );
  return data;
};
