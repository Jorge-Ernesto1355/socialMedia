import React from "react";
import "./Comments.css";
import Comment from "./Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll/useInfiniteScroll";
import Loader from "../../../../utilities/Loader";

const Comments = ({ id, request, name, className }) => {
  const {
    results: comments,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteScroll({ name, id, request });

  return (
    <InfiniteScroll
      dataLength={comments.length}
      hasMore={hasNextPage || isLoading}
      next={() => fetchNextPage()}
      className={className}
      style={{ overflow: "none" }}
    >
      <div>
        {isError && <>error</>}
        {!isLoading && !isError && comments?.length <= 0 && (
          <>no hay comments</>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {comments?.map((comment) => (
              <>
                <Comment key={comment._id} comment={comment} postId={id} />
              </>
            ))}
          </>
        )}
      </div>
    </InfiniteScroll>
  );
};

export default Comments;
