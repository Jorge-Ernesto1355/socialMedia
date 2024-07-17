import React from "react";
import "./likePost.css";

import like from "../../assets/likePost.png";
import { objetsImgs } from "../MIDDLE/post/post/objectImg";

const DisplayLike = ()=>{
  
}



const LikePost = ({ reactionType, reactionUser}) => {

  if(typeof reactionUser === "undefined"){
    return (<>
    {reactionType === null  ? (
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
    </>)
  } else {
  return (
        <div className="actionsActivated" >
          <img
          className="reacted-icon"
            src={objetsImgs[reactionUser?.reaction?.label]}
            alt="reactiontype-likeSelected"
          />
          <span
            className={reactionUser?.reaction?.label}
          >
            me {reactionUser?.reaction?.label}
          </span>
        </div>
  )
      
      
  }

}

export default LikePost;
