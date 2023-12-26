import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { objetsImgs } from "../MIDDLE/post/post/objectImg";
import useHover from "../../hooks/useHover";

const LikeComment = ({ reactionType, setShowReactions, isVisible }) => {

  const {hovered, show} = useHover()
 
  useEffect(()=>{
   setShowReactions(show)
   isVisible()
  }, [show])

  return (
    <div className="ratingIcon">
      {reactionType === null && (
        <span
        onClick={() => {
          setShowReactions((prev) => !prev)
          isVisible()
        }}
        onMouseEnter={() => hovered(true)}
          className="actions-comment-text"
        >
          me gusta
        </span>
      )}
      {reactionType !== null && (
        <div className="actionsActivated">
          {objetsImgs[reactionType] !== undefined ? (
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1.1 }}
              src={objetsImgs[reactionType]}
            />
          ) : (
            <span>Image not available</span>
          )}
          <span className={reactionType} onClick={() => hovered(true)}>
            me {reactionType}
          </span>
        </div>
      )}
    </div>
  );
};

export default LikeComment;
