import React from "react";
import "./Comments.css";
import Comment from "./Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll/useInfiniteScroll";
import Loader from "../../../../utilities/Loader";
import CommentService from "./services/CommentServices";
import useUserRequest from "../../../../hooks/auth/useUserRequest";
import ComponentStateHandler from "../../../../hooks/stateManagmentComponent/ComponentStateHandler";
import CommentsLoader from "./Loader/CommentsLoader";

const Comments = ({ id, request, name, className, type }) => {

  const privateRequest = useUserRequest()
  const {
    results: comments,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteScroll({ name, id, request:CommentService.getComments, privateRequest, type });



  return (
    <InfiniteScroll
      dataLength={comments.length}
      hasMore={hasNextPage || isLoading}
      next={() => fetchNextPage()}
      className={className}
      style={{ overflow: "none" }}
    >
        <ComponentStateHandler Loader={<CommentsLoader/>} isError={true} isLoading={false} >
            {comments?.map((comment) => (
              <>
                <Comment key={comment._id} comment={comment} postId={id} />
              </>
            ))}
        </ComponentStateHandler>
      <div>

      </div>
    </InfiniteScroll>
  );
};

export default Comments;
