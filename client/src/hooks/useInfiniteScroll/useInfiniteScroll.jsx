import { useInfiniteQuery } from "react-query";

/**
 * Custom hook that implements infinite scrolling functionality using the `useInfiniteQuery` hook from the `react-query` library.
 * @param {Object} params - The parameters for the hook.
 * @param {string} params.name - The name parameter used to generate a unique key for the query.
 * @param {string} params.id - The id parameter used as part of the key for the query.
 * @param {Function} params.request - The function called to fetch the data.
 * @returns {Object} - An object containing the paginated results, loading state, error state, and pagination information.
 */
const useInfiniteScroll = ({ name, id, request, label, privateRequest, type}) => {
  // Check if the required parameters are provided
  if (!name) {
    throw new Error("Missing name parameter");
  }

  if (!request) {
    throw new Error("Missing request parameter");
  }

  // Use the useInfiniteQuery hook to fetch the data
  const { data, isLoading, isError, hasNextPage, fetchNextPage, error } =
    useInfiniteQuery(
      [name, id],
      ({ pageParam = 1 }) =>
        request({ name, id, label, limit: 5, page: pageParam , privateRequest, type}),
      {
        getNextPageParam: ({ data }) => {
          if (!data || data.page === data.totalPages) {
            return false;
          }
          return data.page + 1;
        },
      },
    );

  // Flatten the paginated results into a single array

  console.log(data, name)
  const results = data?.pages?.flatMap((page) => page.data?.docs ?? []) ?? [];

  // Return the paginated results, loading state, error state, and pagination information
  return { results, isLoading, isError, hasNextPage, fetchNextPage, error };
};

export default useInfiniteScroll;
