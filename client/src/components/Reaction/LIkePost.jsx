import React from "react";
import "./likePost.css";

import like from "../../assets/likePost.png";
import { objetsImgs } from "../MIDDLE/post/post/objectImg";



const LikePost = ({ reactionType}) => {

  

 
  

  return (
    <div className="ratingIcon" >
      {reactionType === null ? (
        <div
          className="reaction-div"
          
        >
          <img className="icon like" src={like} alt="like-post" />
          <span className="reaction-text">me gusta</span>
        </div>
      ) : (
        <div className="actionsActivated" >
          <img
          className="reacted-icon"
            src={objetsImgs[reactionType]}
            alt="reactiontype-likeSelected"
          />
          <span
            className={reactionType}
          >
            me {reactionType}
          </span>
        </div>
      )
      }
    </div >
  )
}

export default LikePost;
