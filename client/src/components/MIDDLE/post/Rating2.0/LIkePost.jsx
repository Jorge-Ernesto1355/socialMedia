import React from "react";
import "./likePost.css";
import { motion } from "framer-motion";
import like from "../actionsPost/icons/likePost.png";
import { objetsImgs } from "../post/objectImg";

const LikePost = ({ reactionType, setShowReactions }) => {
  return (
    <div className="ratingIcon">
      {reactionType === null ? (
        <div
          className="reaction-div"
          onClick={() => setShowReactions((prev) => !prev)}
          onMouseEnter={() => setShowReactions(true)}
        >
          <img className="icon" src={like} alt="like-post" />
          <span className="reaction-text">me gusta</span>
        </div>
      ) : (
        <div className="actionsActivated">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1.1 }}
            src={objetsImgs[reactionType]}
            alt="reactiontype-likeSelected"
          />
          <span
            className={reactionType}
            onClick={() => setShowReactions((prev) => !prev)}
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
