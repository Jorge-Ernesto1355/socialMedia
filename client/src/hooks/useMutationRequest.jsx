import { useMutation, useQueryClient } from "react-query";

const useMutationRequest = (request, { name } = {}) => {
  if (typeof request !== "function") {
    throw new Error("request must be a function");
  }


  if (!name) {
    throw new Error("error:name should be defined");
  }



  const queryClient = useQueryClient();
  const {
    mutate,
    isLoading: isLoadingMutation,
    isError,
    reset,
    status
  } = useMutation({
    mutationFn: request,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries([name]);
      // esto lo hacemos para guardar el estado previo
      // por si tenemos que hacer un rollback
      const previousComments = queryClient.getQueryData([name]);
      queryClient.setQueryData([name], (oldData) => {
        const newCommentToAdd = structuredClone(newComment);
        newCommentToAdd.preview = true;
        if (oldData == null) return [newCommentToAdd];
        return oldData?.concat(newCommentToAdd);
      });

      return { previousComments }; // -----> context
    },
    onError: (_error, variables, context) => {
      if (context?.previousComments != null) {
        queryClient.setQueryData([name], context.previousComments);
      }

    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [name],
      });
    },
  });

  return { mutate, isLoadingMutation, isError, reset, status };
};

export default useMutationRequest;
