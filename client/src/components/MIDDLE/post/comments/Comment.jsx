import React, { Suspense, lazy, useState } from "react";
import "./Comment.css";
import GetUser from "../../../../services/GetUser.service";
import rem from "../../../../assets/rem.jpg";
import more from "./EllipsiComments/icons/ellipsis.png";

import moment from "moment";
import { UserAdapterSucces } from "../../../Profile/useAdapter";

import MakeComment from "./makeComment/MakeComment";

import { UpdateCommentMutate } from "../useQuery/mutation/Post";
import ReactionsView from "../../../Reaction/Reactions/ReactionsView";

import UseImagePreview from "../../../../hooks/useImagePreview/useImagePreview";
import { useQuery } from "react-query";
import ShowComments from "./ShowComments";

import Loader from "../../../../utilities/Loader";
import Reaction from "../../../Reaction/Reaction";
import LikeComment from '../../../Reaction/LikeComment'
import AuthProvider from "../../../../zustand/AuthProvider";

const More = lazy(() => import("./EllipsiComments/More"));

const Comment = ({ comment }) => {
  const { text, userId, image } = comment.comment;
  const { userId: currentUser } = AuthProvider()
  const commentId = comment?._id;

  const commentsResponded = comment?.commentsResponded ?? [];

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
    () => GetUser(userId),
    {
      enabled: !!userId,
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
            type="Comment"
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
            type="Comment"
            id={commentId}
            name={"comment-view"}
            userId={currentUser}
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
                userforDisplay={userId}
                userId={currentUser}
                id={commentId}
                type="Comment"
                name={"CommentsResponded"}
                componentId={commentId}
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
