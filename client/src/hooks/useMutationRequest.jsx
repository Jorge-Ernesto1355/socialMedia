import { useMutation, useQueryClient } from "react-query";

const useMutationRequest = (request, { name, id } = {}, fetchToUpdate) => {
  if (typeof request !== "function") {
    throw new Error("request must be a function");
  }

  if (!name && !id) {
    throw new Error("error:name and id should be defined");
  }

  if (typeof name && typeof id !== "string") {
    throw new Error("error: name and id should be of type string");
  }

  const queryClient = useQueryClient();
  const {
    mutate,
    isLoading: isLoadingMutation,
    isError,
    reset,
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

  return { mutate, isLoadingMutation, isError, reset };
};

export default useMutationRequest;