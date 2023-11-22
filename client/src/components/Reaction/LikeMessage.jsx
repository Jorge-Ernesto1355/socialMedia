import React, { useEffect } from "react";
import "./likePost.css";

import emoji from '../RIGHT/icons/sonreir.png'
import useHover from "../../hooks/useHover";

const LikeMessage = ({ setShowReactions, isVisible}) => {

   const {hovered, show } = useHover()

   useEffect(()=>{
    setShowReactions(show)
    isVisible()
   }, [show])

   
   
  return (
    <div className="ratingIcon">
      
        <div
          className="reaction-div"
          onClick={() => {
            setShowReactions((prev) => !prev)
            isVisible()
          }}
          onMouseEnter={() => hovered(true)}
        >
          <p className='popover-text-message'>React</p>
          <img src={emoji} alt="react" className='popover-img-message' />
        </div>
    
    </div >
  )
}

export default LikeMessage;
