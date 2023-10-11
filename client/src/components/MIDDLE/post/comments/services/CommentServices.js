export default class CommentService {
  static async comment(comment) {
    if (!comment.privateRequest) throw new Error("could not load the request");
    const form = new FormData();

    for (const key in comment) {
      form.append(key, comment[key]);
    }

    const data = await comment.privateRequest.post(
      `/comment/${comment.containerId}/${comment.type}`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  }

  static async getComments({ privateRequest, id: containerId, type }) {
    try {
      if (!privateRequest) throw new Error("could not load the request");
      return await privateRequest.get(`/comment/all/${containerId}/${type}`);
    } catch (error) {
      return error;
    }
  }
}
