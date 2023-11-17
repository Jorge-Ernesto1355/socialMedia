import React, { useEffect } from "react";
import "./likePost.css";
import { motion } from "framer-motion";
import like from "../../assets/likePost.png";
import { objetsImgs } from "../MIDDLE/post/post/objectImg";
import useHover from "../../hooks/useHover";


const LikePost = ({ reactionType, setShowReactions, isVisible }) => {

  
  const {hovered, show} = useHover()
 
  useEffect(()=>{
   setShowReactions(show)
   isVisible()
  }, [show])

  return (
    <div className="ratingIcon" onMouseEnter={() => hovered(true)}>
      {reactionType === null ? (
        <div
          className="reaction-div"
          onClick={() => {
            setShowReactions((prev) => !prev)
            isVisible()
          }}
          onMouseEnter={() => hovered(true)}
        >
          <img className="icon" src={like} alt="like-post" />
          <span className="reaction-text">me gusta</span>
        </div>
      ) : (
        <div className="actionsActivated" onMouseEnter={() => hovered(true)}>
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1.1 }}
            src={objetsImgs[reactionType]}
            alt="reactiontype-likeSelected"
          />
          <span
            className={reactionType}
            onClick={() => hovered(true)}
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
