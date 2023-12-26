import React from "react";
import "./ActionsPost.css";

import comment from "./icons/comment.png";



import Reaction from "../../../Reaction/Reaction";
import LikePost from '../../../Reaction/LIkePost'
import SharePost from "../share/SharePost";


const ActionsPost = ({ postId, userId }) => {
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
            <LikePost />
          </Reaction>
        </div>
        <div>
          <img className="icon icon-comment" src={comment} alt="" />
          <span className="interaction-button-text">Comment</span>
        </div>
        <SharePost/>
      </div>
    </div>
  );
};

export default ActionsPost;
