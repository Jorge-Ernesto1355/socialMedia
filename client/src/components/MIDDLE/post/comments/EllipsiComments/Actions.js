import { useMutation, useQueryClient } from "react-query";
import CommentService from "../services/CommentServices";
import { message } from "antd";
import { UpdateCommentMutate } from "../../useQuery/mutation/Post";


export const deleteCommentMutation = ({ postId, commentId }) => {
    const queryClient = useQueryClient();
    const queryComment = ['postComment', postId];
    

    const deleteComment = useMutation({
        mutationKey: ['comment-delete'],
        mutationFn: CommentService.delete,
        onSuccess: () => {
           
            queryClient.setQueryData(queryComment, (oldComments) => {
                if (!oldComments) return oldComments;

                const newPages = oldComments.pages.map((page) => {
                    const newDocs = page.data.docs.filter(({ _id }) => _id !== commentId);
                    return { ...page, data: { ...page.data, docs: newDocs } };
                });

                return { ...oldComments, pages: newPages };
            });
            message.success("comment deleted")
        },
        onError:()=> message.error("Something went Wrong")
    });

    return deleteComment;
};


export const updateCommentMutation = ({ postId, commentId }) => {
    const queryClient = useQueryClient();
    const queryComment = ['postComment', postId];

    const updateComment = useMutation({
        mutationKey: ['comment-update'],
        mutationFn: CommentService.update,
        onMutate: async (updatedComment) => {
            await queryClient.cancelQueries(queryComment);

            const previousComments = queryClient.getQueryData(queryComment);

            queryClient.setQueryData(queryComment, (oldComments) => {
                if (!oldComments) return oldComments;

                const newPages = oldComments.pages.map((page) => {
                    const newDocs = page.data.docs.map((comment) =>
                        comment._id === commentId ? { ...comment, text: updatedComment?.textCommentEdit } : comment
                    );
                    return { ...page, data: { ...page.data, docs: newDocs } };
                });

                return { ...oldComments, pages: newPages };
            });

            return { previousComments };
        },
        onError: (err, comment, context) => {
            
            if ( err && context?.previousComments != null) {
                queryClient.setQueryData(queryComment, context.previousComments);
              }
        },
        onSettled: () => {
            queryClient.invalidateQueries(queryComment);
        },
    });

    return updateComment
};


export const useHideComment = () => {
    const queryClient = useQueryClient();
  
    const hideComment = async ({ commentId, postId, reported = false }) => {
      const queryComment = ['postComment', postId];
  
      await queryClient.cancelQueries(queryComment);
      queryClient.setQueryData(queryComment, (oldComments) => {
        if (!oldComments) return oldComments;
  
        const newPages = oldComments.pages.map((page) => {
          const newDocs = page.data.docs.filter(({ _id }) => _id !== commentId);
          return { ...page, data: { ...page.data, docs: newDocs } };
        });
  
        if (reported) {
          message.success("Comment reported");
        } else {
          message.success("Comment has been hidden");
        }
  
        return { ...oldComments, pages: newPages };
      });
    };
  
    return hideComment;
  };