import { userRequest } from "../utilities/requestMethod";

const CreatePostService = async (post) => {
  const form = new FormData();

  // quitamos el el array votes del post
  const { votes, ...posts } = post;

  for (const key in posts) {
    form.append(key, posts[key]);
  }

  // lo ponemos en el formData pero ya con stringify para que no salfa [object Object]
  form.append("votes", JSON.stringify(votes));

  const data = await userRequest.post("/post", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (data.data && post?.postShared) {
    const dataShare = await userRequest.put(
      `/post/share/${post.postShared}?userId=${post.userId}&postId=${data?.data?._id}`,
    );

    console.log(dataShare);
  }

  return data;
};

export default CreatePostService;
