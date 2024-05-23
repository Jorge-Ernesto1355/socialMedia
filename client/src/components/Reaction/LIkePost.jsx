import React from "react";
import "./likePost.css";
import { motion } from "framer-motion";
import like from "../../assets/likePost.png";
import { objetsImgs } from "../MIDDLE/post/post/objectImg";



const LikePost = ({ reactionType}) => {

  

 
  

  return (
    <div className="ratingIcon" >
      {reactionType === null ? (
        <div
          className="reaction-div"
          
        >
          <img className="icon" src={like} alt="like-post" />
          <span className="reaction-text">me gusta</span>
        </div>
      ) : (
        <div className="actionsActivated" >
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1.1 }}
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
