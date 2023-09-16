import React from 'react';
import './Comments.css';
import Comment from './Comment';
import InfiniteScroll from 'react-infinite-scroll-component';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll/useInfiniteScroll';

const Comments = ({ id, request, name, className}) => {
  const {results:comments, isLoading, isError, hasNextPage, fetchNextPage} = useInfiniteScroll({name, id, request})


  const Variants = {
    visible: {
      scale: 1
    },
    hidden: {
      scale: 0
    }
  };

  return (
    <InfiniteScroll 
    dataLength={comments.length}
    hasMore={hasNextPage || isLoading}
    next={()=>fetchNextPage()}
    className={className}
    style={{overflow:'none'}}
    >

    <div >
      {isLoading ? (
        <div>jorge guaop</div>
        ) : (
          <>
          {comments?.map((comment) => (
            <Comment key={comment._id} comment={comment} postId={id} />
            ))}
        </>
      )}
    </div>
      </InfiniteScroll>
  );
};

export default Comments;
