import React from "react";
import "./ActionsPost.css";

import comment from "./icons/comment.png";



import Reaction from "../../../Reaction/Reaction";
import LikePost from '../../../Reaction/LIkePost'
import SharePost from "../share/SharePost";
import CommentMobile from "../comments/makeComment/CommentMobile";


const ActionsPost = ({ postId, userId , post, reactionUser}) => {
  return (
    <div className="action-buton">
      <div className="interacions-buttons">
        <div className="ratingIcon">
          <Reaction
            name="reactionsView"
            id={postId}
            userId={userId}
            type={'Post'}
          >
            <LikePost reactionUser={reactionUser} />
          </Reaction>
        </div>
        <div>
          <img className="icon icon-comment" src={comment} alt="" />
          <CommentMobile post={post}/>
        </div>
        <SharePost postId={postId} userId={userId}/>
      </div>
    </div>
  );
};

export default ActionsPost;
