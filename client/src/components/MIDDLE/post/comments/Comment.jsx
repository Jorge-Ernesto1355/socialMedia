import React, { useState } from 'react';
import './Comment.css';
import GetUser from '../../../../services/GetUser.service';
import rem from '../../../../assets/rem.jpg';
import more from '../../../../assets/iconsPost/more.png';
import EllipsisComment from './EllipsisComment';
import moment from 'moment';
import { UserAdapterSucces } from '../../../Profile/useAdapter';
import { useSelector } from 'react-redux';
import MakeComment from './makeComment/MakeComment';

import { UpdateCommentMutate } from '../useQuery/mutation/Post';
import ReactionsView from '../Reactions/ReactionsView';

import getCommentReactions from '../services/comment/getCommentReactions';
import getCommentReaction from '../services/comment/getReactionComment';
import getCommentReactionsView from '../services/comment/getCommentReactionsView';


import Reaction from '../Rating2.0/Reaction';
import { ReactionComment } from '../services/comment/ReactionComment';
import LikeComment from '../Rating2.0/LikeComment';
import CommentAxios from '../services/comment/Comment';
import UseImagePreview from '../../../../hooks/useImagePreview/useImagePreview';
import { useQuery } from 'react-query';
import ShowComments from './ShowComments';


const Comment = ({ comment, postId }) => {
  const { text, userId } = comment.comment;
  let commentId = comment?._id;

  const commentsResponded = comment?.commentsResponded ?? []


  const { _id: currentUser } = useSelector(
    (state) => state.user.currentUser.user
  );

  //ensenar makeComment
  const [makeComment, setMakeComment] = useState(false);

  const [updateComment, setUpdateComment] = useState(false);

  const [textValue, setTextValue] = useState('');



  //UpdateComment
  const updateCommentMutate = UpdateCommentMutate(commentId);

  const updateCommentFun = () => {
    updateCommentMutate({ commentId, text: textValue });
  };



  const {data:userData, isLoadingUser, isError} = useQuery(['user', userId], ()=> GetUser(currentUser), {
    enabled: currentUser ? true : false
  })
  const user = userData?.data?.data ?? UserAdapterSucces() 


  const {element, input} = UseImagePreview()

  return (
    <div className="comment">
      <div className="head">
        {!isLoadingUser && <img className="photo" src={rem} alt="" /> }
        
        
        <div className="username-text">
          {!isLoadingUser && <h4>{user?.username ?? ''}</h4>}
          {updateComment ? (
            <>
             
              <input
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
              />
              <span onClick={() => updateCommentFun()}>listo</span>
            </>
          ) : (
            <p>{text}</p>
          )}
         <ReactionsView id={commentId} name={'comment'} nameView={'comment-view'} reqReactionsView={getCommentReactionsView}  reqReactions={getCommentReactions} reqReaction={getCommentReaction}/>

        
        </div>
        <span className="more">
          <div className="Ellipsis-comment">
            <EllipsisComment
              commentId={commentId}
              changeEditarComment={setUpdateComment}
            >
              <img src={more} className="icon" alt="" />
            </EllipsisComment>
          </div>
        </span>
      </div>
      <div className="body">
        <div>
        
        </div>
        <div className="actions-comments">
          <Reaction id={commentId} name={'comment-view'} request={ReactionComment} userId={userId}><LikeComment/></Reaction>
          <span onClick={() => setMakeComment(!makeComment)}>Responder</span>
          <span className="text-muted">
            {moment(comment.createdAt).format('ll')}
          </span>
        </div>
      </div>
      

      <ShowComments commentId={commentId} respondedLength={commentsResponded?.length}/>

      {makeComment && (
      <>
          <MakeComment
            userforDisplay={user?._id}
            userId={currentUser}
            postId={postId}
            commentId={commentId}
            request={CommentAxios}
            ref={input}
          />
          <div className="img">
            <img ref={element} alt="" />
          </div>
       </>
      ) }
    </div>
  );
};

export default Comment;
