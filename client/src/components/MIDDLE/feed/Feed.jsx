import React from "react";
import "./Feed.css";

// components
import Post from "../post/post/Post";




// service
import { GetPosts } from "../../../services/getPosts.services";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll/useInfiniteScroll";
import PostLoader from "../post/post/postLoader/PostLoader";

/**
 * Renders a feed of posts using infinite scroll.
 * @param {number} limit - The maximum number of posts to fetch per page.
 * @returns {JSX.Element} - The rendered feed of posts.
 */
export default function Feed({ limit }) {


  const { results, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteScroll({
      name: "posts",
      request: GetPosts,
    });

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <InfiniteScroll
      dataLength={results.length}
      hasMore={hasNextPage || isLoading}
      loader={<PostLoader />}
      next={() => fetchNextPage()}
    >
      <ul className="feeds">

        {results?.map((post) => (
          <Post key={`post-key=${post._id}`} post={post} />
        ))}
      </ul>
    </InfiniteScroll>
  );
}
