import React, { useEffect } from "react";
import "./likePost.css";

import emoji from '../RIGHT/icons/sonreir.png'
import useHover from "../../hooks/useHover";

const LikeMessage = ({ reactionType, setShowReactions, isVisible}) => {

   const {hovered, show } = useHover()

   console.log(isVisible)


   useEffect(()=>{
    setShowReactions(show)
    isVisible()
   }, [show])

   
   
  return (
    <div className="ratingIcon" >
      
        <div
          className="reaction-div"
          onClick={() => {
            setShowReactions((prev) => !prev)
            isVisible()
          }}
          onMouseEnter={() => hovered(true)}
        >
          <p className='popover-text-message'>React</p>
                    <span><img src={emoji} alt="react" className='popover-img-message' /></span>
        </div>
    
    </div >
  )
}

export default LikeMessage;
