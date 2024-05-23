import React, {  useState } from "react";
import "./Comment.css";

import rem from "../../../../assets/rem.jpg";
import moment from "moment";


import MakeComment from "./makeComment/MakeComment";
import ReactionsView from "../../../Reaction/Reactions/ReactionsView";

import UseImagePreview from "../../../../hooks/useImagePreview/useImagePreview";
import { useQuery } from "react-query";
import ShowComments from "./ShowComments";
import Reaction from "../../../Reaction/Reaction";

import AuthProvider from "../../../../zustand/AuthProvider";
import UserService from "../../../../services/UserService";
import useUserRequest from "../../../../hooks/auth/useUserRequest";
import LikePost from "../../../Reaction/LIkePost";
import IconMoreHorizontal from "../../../../assets/icons/MoreHo";
import { Input, Popover, Skeleton } from "antd";
import EllipsisComment from "./EllipsiComments/EllipsisComment";
import { updateCommentMutation } from "./EllipsiComments/Actions";


const Comment = ({ comment, postId, userId: userIdPost }) => {
  const { text, userId, image } = comment.comment;
  const { userId: currentUser } = AuthProvider()
  const commentId = comment?._id;
  const privateRequest = useUserRequest()
  const commentsResponded = comment?.commentsResponded ?? [];

  const [makeComment, setMakeComment] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const [updateComment, setUpdateComment] = useState(false);

  const [textValue, setTextValue] = useState("");


  const toggleEditComment = ()=> setUpdateComment((prev)=> !prev)

  const {mutate: mutateUpdateComment, isLoading: isLoadingUpdateComment} = updateCommentMutation({postId, commentId})

  const handleUpdateComment = ()=>{
    mutateUpdateComment({textCommentEdit: textValue, privateRequest, id:commentId})
    toggleEditComment()
  
  }


  const { data: user, isLoadingUser } = useQuery(
    ["user", userId],
    () => UserService.getUser({privateRequest, userId}),
    {
      enabled: !!userId,
    },
  );


  const { element, input } = UseImagePreview();

  return (
    <div
      className={`comment ${comment.preview ? "comment-preview" : "comment-normal"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="head-comment">
        {!isLoadingUser && <img className="photo" src={rem} alt="" />}

        <div className="username-text">
         <div className="username-comment">
         {!isLoadingUser && <h4>{user?.username ?? ""}</h4>}
         {isHovered && <Popover trigger={"click"} content={<EllipsisComment editComment={toggleEditComment} postId={postId} isYourPost={userIdPost === currentUser} idComment={commentId} isYours={currentUser === userId}/>}><IconMoreHorizontal /></Popover>}
         </div>

          {updateComment ? (
            <>
              <Input
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
              />
              <span style={{cursor: "pointer", marginTop: ".5rem"}} onClick={() => handleUpdateComment()}>Editar</span>
            </>
          ) : (
            
            <>

            {isLoadingUpdateComment ? <Skeleton.Input active={true} size={"small"}  block/> : <span>{text}</span> }
            
            </>
            
          )}
          <ReactionsView
            id={commentId}
            name={"comment"}
            nameView={"comment-view"}
            type="Comment"
            className="reactionView-comment"
          />
        </div>
        
      </div>
      {image?.url && (
        <div className="container-image-comment">
          <img src={image?.url} alt="image-comment" className="image-comment" />
        </div>
      )}
      
      <div className="body">
        
        <div className="actions-comments">
          <Reaction
            type="Comment"
            id={commentId}
            name={"comment-view"}
            userId={currentUser}
          >
            <LikePost />
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
