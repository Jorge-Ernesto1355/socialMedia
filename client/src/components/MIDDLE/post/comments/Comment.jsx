import React, { Suspense, lazy, useState } from "react";
import "./Comment.css";
import GetUser from "../../../../services/GetUser.service";
import rem from "../../../../assets/rem.jpg";
import more from "./EllipsiComments/icons/ellipsis.png";

import moment from "moment";
import { UserAdapterSucces } from "../../../Profile/useAdapter";
import { useSelector } from "react-redux";
import MakeComment from "./makeComment/MakeComment";

import { UpdateCommentMutate } from "../useQuery/mutation/Post";
import ReactionsView from "../Reactions/ReactionsView";

import getCommentReactions from "../services/comment/getCommentReactions";
import getCommentReaction from "../services/comment/getReactionComment";
import getCommentReactionsView from "../services/comment/getCommentReactionsView";

import Reaction from "../Rating2.0/Reaction";
import { ReactionComment } from "../services/comment/ReactionComment";
import LikeComment from "../Rating2.0/LikeComment";

import UseImagePreview from "../../../../hooks/useImagePreview/useImagePreview";
import { useQuery } from "react-query";
import ShowComments from "./ShowComments";
import commentRespondedAxios from "../services/comment/commentRespondesAxios";

import Loader from "../../../../utilities/Loader";

const More = lazy(() => import("./EllipsiComments/More"));

const Comment = ({ comment, postId }) => {
  const { text, userId, image } = comment.comment;
  const commentId = comment?._id;

  const commentsResponded = comment?.commentsResponded ?? [];

  const { _id: currentUser } = useSelector(
    (state) => state.user.currentUser.user,
  );


  const [makeComment, setMakeComment] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const [updateComment, setUpdateComment] = useState(false);

  const [textValue, setTextValue] = useState("");


  const updateCommentMutate = UpdateCommentMutate(commentId);

  const updateCommentFun = () => {
    updateCommentMutate({ commentId, text: textValue });
  };



  const { data: userData, isLoadingUser } = useQuery(
    ["user", userId],
    () => GetUser(currentUser),
    {
      enabled: !!currentUser,
    },
  );

  const user = userData?.data?.data ?? UserAdapterSucces();

  const { element, input } = UseImagePreview();

  return (
    <div
      className={`comment ${comment.preview ? "comment-preview" : "comment-normal"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="head">
        {!isLoadingUser && <img className="photo" src={rem} alt="" />}

        <div className="username-text">
          {!isLoadingUser && <h4>{user?.username ?? ""}</h4>}

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
          <ReactionsView
            id={commentId}
            name={"comment"}
            nameView={"comment-view"}
            reqReactionsView={getCommentReactionsView}
            reqReactions={getCommentReactions}
            reqReaction={getCommentReaction}
          />
        </div>
        {isHovered && (
          <Suspense fallback={<Loader />}>
            <span className="more">
              <More>
                <img src={more} className="icon" alt="" />
              </More>
            </span>
          </Suspense>
        )}
      </div>
      {image?.url && (
        <div className="container-image-comment">
          <img src={image?.url} alt="image-comment" className="image-comment" />
        </div>
      )}
      <div className="body">
        <div></div>
        <div className="actions-comments">
          <Reaction
            id={commentId}
            name={"comment-view"}
            request={ReactionComment}
            userId={userId}
          >
            <LikeComment />
          </Reaction>
          <span
            onClick={() => setMakeComment(!makeComment)}
            className="actions-comment-text"
          >
            Responder
          </span>
          <span className="text-muted">
            {moment(comment.createdAt).format("ll")}
          </span>
        </div>
      </div>
      <ShowComments
        commentId={commentId}
        respondedLength={commentsResponded?.length}
      />

      {makeComment && (
        <>
          <div className="comment-makecomment-container">
            {input && (
              <MakeComment
                userforDisplay={user?._id}
                userId={currentUser}
                id={postId}
                name={"comments-Responded"}
                componentId={commentId}
                request={commentRespondedAxios}
                ref={input}
                hideMakeComments={setMakeComment}
              />
            )}

            {element && (
              <div className="post-imgToPost">
                <img ref={element} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
