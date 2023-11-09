import React from "react";
import "./likePost.css";
import react from '../RIGHT/messages/icons/corazon.png'



const LikeMessage = ({ reactionType, setShowReactions }) => {
  return (
    <div className="ratingIcon">
      {reactionType === null ? (
        <div
          className="reaction-div"
          onClick={() => setShowReactions((prev) => !prev)}
          onMouseEnter={() => setShowReactions(true)}
        >
          <li className='MessageActions-icon'>
            <img src={react} alt="react icon" />
       </li>
        </div>
      ) : (
        <li className='MessageActions-icon'>
        <img src={react} alt="react icon" />
   </li>
      )
      }
    </div >
  )
}

export default LikeMessage;
