import React from "react";
import "./likePost.css";

import emoji from '../RIGHT/icons/sonreir.png'


const LikeMessage = ({ reactionType, setShowReactions }) => {
  return (
    <div className="ratingIcon">
      
        <div
          className="reaction-div"
          onClick={() => setShowReactions((prev) => !prev)}
          onMouseEnter={() => setShowReactions(true)}
        >
          <p className='popover-text-message'>React</p>
                    <span><img src={emoji} alt="react" className='popover-img-message' /></span>
        </div>
    
    </div >
  )
}

export default LikeMessage;
