import React from "react";
import { ReactionPost } from "../services/actions/actions";
import "./ActionsPost.css";

import comment from "./icons/comment.png";
import share from "./icons/share.png";


import Reaction from "../../../Reaction/Reaction";
import LikePost from '../../../Reaction/LIkePost'


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
        <div>
          <img className="icon" src={share} alt="" />
          <span className="interaction-button-text">Compartir</span>
        </div>
      </div>
    </div>
  );
};

export default ActionsPost;
