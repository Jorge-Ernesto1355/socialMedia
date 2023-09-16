import { useMutation, useQueryClient } from "react-query";

const useMutationRequest = (request, ToReLoad) => {
    if (typeof request !== 'function') {
        throw new Error('request must be a function');
      }

      if (typeof ToReLoad !== 'object') {
        throw new Error('ToReLoad must be an object');
      }
    const queryClient = useQueryClient();
    const { mutate, isLoading, isError} = useMutation(request, {
      onSuccess: () => {
        if(ToReLoad){
            queryClient.invalidateQueries([`${ToReLoad.name}-${ToReLoad.id}`, ToReLoad.id]);
        }
      }
    });

    return {mutate, isLoading, isError}
  };

  export default useMutationRequest