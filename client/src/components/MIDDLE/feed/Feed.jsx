import React, { useEffect, useId } from "react";
import "./Feed.css";

// components
import Post from "../post/post/Post";
import { v4 as uuidv4 } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll/useInfiniteScroll";
import PostLoader from "../post/post/postLoader/PostLoader";
import useUserRequest from "../../../hooks/auth/useUserRequest";
import PostServices from "../post/services/PostServices";
import AuthProvider from "../../../zustand/AuthProvider";
import ErrorPost from "../post/post/ErrorPost/ErrorPost";
import Skeleton from "../../Skeleton/Skeleton";


/**
 * Renders a feed of posts using infinite scroll.
 * @param {number} limit - The maximum number of posts to fetch per page.
 * @returns {JSX.Element} - The rendered feed of posts.
 */
export default function Feed() {

  const privateRequest = useUserRequest()
  const { userId } = AuthProvider()
  const uuid = uuidv4()



  const { results, isLoading, isError,  hasNextPage, fetchNextPage, reset, refetch } =
    useInfiniteScroll({
      name: "posts",
      request: PostServices.getTimeLine,
      privateRequest,
      id: userId
    });

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  if (isError) {
    return <ErrorPost reset={reset} />;
  }
  
 


  return (
    <InfiniteScroll
      dataLength={results.length}
      hasMore={hasNextPage || isLoading}
      loader={<PostLoader />}
      next={() => fetchNextPage()}
    >
      <ul className="feeds" key={uuid}>
        {results?.map((post) => (
          <>
            <Post key={post._id} post={post} />
          </>
        ))}
      </ul>
    </InfiniteScroll>
  );
}
