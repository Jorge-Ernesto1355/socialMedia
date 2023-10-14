export default class PostServices {


    static async create(post){

        if(!post?.privateRequest){
            throw new Error('could not load the request')
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
      
        if (data.data && post?.postShared) {
          const dataShare = await post.privateRequest.put(
            `/post/share/${post.postShared}?userId=${post.userId}&postId=${data?.data?._id}`,
          );
      
        
        }
      
        return data;

    }

    static async getTimeLine({privateRequest,id:userId, limit, page }){
      
      try {
            if(!privateRequest){
              throw new Error('could not load the request')
            }
            return privateRequest?.get(`/post/timeLine/${userId}?limit=${limit}&page=${page}`)
          } catch (error) {
            return error
          }
    }

    static async delete({privateRequest, postId, userId}){
     
      try {
        if(!privateRequest){
          throw new Error('could not load the request')
        }
        return  await privateRequest.delete(`/post/${postId}?userId=${userId}`);
      } catch (error) {
        return error
      }
    }

    static async update({privateRequest, post}){

      
        try {

          if(!privateRequest){
            throw new Error('could not load the request')
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
          return error
        }
      
    }
}