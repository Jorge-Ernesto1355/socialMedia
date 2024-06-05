import { useQuery } from "react-query";
import { useCallback } from "react";
export const useCallbackRequest = ({ request, id, name, type, privateRequest}) => {


  if (typeof id !== 'string' || typeof name !== "string") {
    return {error: "id or name is missing "}
  }
  if (typeof request !== "function") {
    return {error: "request must be a function"}
  }

  const callback = useCallback(() => request({id, type, privateRequest}), [request, id]);

  const { data, isLoading, isError } = useQuery(
    [name, id],
    callback,
    { refetchOnWindowFocus: false },
    { id, name },
  );

  if (!isLoading) {
    if (!data) return { data: [], isLoading: false, isError: true };
  }

  return { data, isLoading, isError };
};
