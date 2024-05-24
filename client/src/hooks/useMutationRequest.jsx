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
    error,
    status,
    isSuccess,
    data
  } = useMutation({
    mutationKey: [name],
    mutationFn: request,
    onMutate: async (newData) => {

      await queryClient.cancelQueries([name]);
      const previousData = queryClient.getQueryData([name]);
      queryClient.setQueryData([name], (oldData) => {

        if (oldData == null) return [newData];
        return oldData?.concat(newData);
      });

      return { previousData }; // -----> context
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

  return { mutate, isLoadingMutation, isError, reset, error, status, data, isSuccess};

};

export default useMutationRequest;
