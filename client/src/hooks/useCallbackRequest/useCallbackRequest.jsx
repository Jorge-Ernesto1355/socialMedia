import { useQuery } from "react-query";
import { useCallback } from "react";
export const useCallbackRequest = ({request, id, name}) => {
  
  
  if (typeof id !== 'string' || typeof name !== 'string') {
    throw new Error('Invalid props: id and name must be of type string');
  }
  if (typeof request !== 'function') {
    throw new Error('Invalid prop: request must be a function');
  }
  
  
        const callback = useCallback(() => request({id}), [request, id]);

      const { data, isLoading, isError} = useQuery(
        [`${name}-${id}`, id],
        callback,
        { refetchOnWindowFocus: false }, 
        { id, name }
      )
      
     if(!isLoading){
      if(!data) return { data:[], isLoading:false, isError:true };
     }
    
      
    return { data, isLoading, isError };
  };