/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import "./Comments.css";
import Comment from "./Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll/useInfiniteScroll";
import CommentService from "./services/CommentServices";
import useUserRequest from "../../../../hooks/auth/useUserRequest";
import ComponentStateHandler from "../../../../hooks/stateManagmentComponent/ComponentStateHandler";
import CommentsLoader from "./Loader/CommentsLoader";
import ErrorMessageComment from "./ErrorMessage/ErrorMessageComment";
import TypeComments from "./typeComments/TypeComments";


const Comments = ({ id, name, className, type }) => {

  const privateRequest = useUserRequest()
  const [typeComments, setTypeComments] = useState(name || '')

  const requests = {
    postComment: CommentService.getComments,
    CommentsResponded: CommentService.getCommentsResponded,
    mostView: CommentService.mostView
  }


  useMemo(() => {
    for (const r in requests) {
      if (!(typeComments in requests)) {
        return null
      }
    }
  }, [typeComments])


  const {
    results: comments,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    reset
  } = useInfiniteScroll({ name: typeComments, id, request: requests[typeComments], privateRequest, type });


  return (
    <>
      {type === "Post" && (
        <div className="typeComments" >
          <TypeComments changeType={setTypeComments} />
        </div>
      )}
      <InfiniteScroll
        dataLength={comments.length}
        hasMore={hasNextPage || isLoading}
        next={() => fetchNextPage()}
        className={className}
        style={{ overflow: "none" }}
      >
        <ComponentStateHandler Loader={<CommentsLoader />} isError={isError} isLoading={isLoading} ErrorMessageComponent={<ErrorMessageComment reset={reset} />}  >
          {comments?.map((comment) => (
            <>
              <Comment key={comment.comment._id} comment={comment} postId={id} />
            </>
          ))}
        </ComponentStateHandler>
        <div>

        </div>
      </InfiniteScroll>
    </>
  );
};

export default Comments;
