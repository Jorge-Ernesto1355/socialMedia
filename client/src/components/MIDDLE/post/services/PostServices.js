import { ObjectErrosName } from "../../../../utilities/ObjectErrorsName";

export default class PostServices {
  static async create(post) {
    if (!post?.privateRequest) {
      throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
    }

    const form = new FormData();

    // quitamos el el array votes del post
    const { votes, ...posts } = post;

    for (const key in posts) {
      form.append(key, posts[key]);
    }

    // lo ponemos en el formData pero ya con stringify para que no salfa [object Object]
    form.append("votes", JSON.stringify(votes));

    const data = await post?.privateRequest.post("/post", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  }

  static async getTimeLine({ privateRequest, id: userId, limit, page }) {
    try {
      if (!privateRequest) {
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      }
      return privateRequest?.get(
        `/post/timeLine/${userId}?limit=${limit}&page=${page}`,
      );
    } catch (error) {
      return error;
    }
  }

  static async delete({ privateRequest, postId, userId }) {
    try {
      if (!privateRequest) {
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      }
      return await privateRequest.delete(`/post/${postId}?userId=${userId}`);
    } catch (error) {
      return error;
    }
  }

  static async get({ privateRequest, id: postId }) {
    try {
      if (!privateRequest) {
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      }
      return await privateRequest.get(`/post/${postId}`);
    } catch (error) {
      return error;
    }
  }

  static async update({ privateRequest, post }) {
    try {
      if (!privateRequest) {
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      }

      const form = new FormData();

      for (const key in post) {
        form.append(key, post[key]);
      }

      const data = await privateRequest.put(
        `/post/${post.postId}?userId=${post.currentUser}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return data;
    } catch (error) {
      return error;
    }
  }

  static async editTimeExpiration({
    privateRequest,
    postId,
    timeExpiration,
    userId,
  }) {
    try {
      if (!privateRequest) {
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      }
      return await privateRequest.put(
        `/post/timeExpiration/${postId}/${userId}`,
        {
          timeExpiration,
        },
      );
    } catch (error) {
      return error;
    }
  }

  static async sharePostMessage({ privateRequest, postId, to, from, text }) {
    try {
      if (!privateRequest) {
        throw new Error(ObjectErrosName.PrivateRequestDoesNotExitst);
      }

      return await privateRequest.post(`/post/share/postMessage/${postId}`, {
        text,
        to,
        from,
      });
    } catch (error) {
      return error;
    }
  }
}
