import React from 'react'
import {motion} from 'framer-motion'

import { objetsImgs } from '../post/objectImg'
const LikeComment = ({reactionType, setShowReactions}) => {

    const handleClick = () => {
        setShowReactions(prev => !prev);
      };
 
  return (
    <div className="ratingIcon">
   {reactionType === null && (
  <span onClick={()=> handleClick()}>me gusta</span>
)}
{reactionType !== null && (
  <div className="actionsActivated">
    {objetsImgs[reactionType] !== undefined ? (
  <motion.img
    initial={{ scale: 0 }}
    animate={{ scale: 1.1 }}
    src={objetsImgs[reactionType]}
    alt=""
  />
) : (
  <span>Image not available</span>
)}
    <span
      className={reactionType}
      onClick={() =>handleClick()}
    >
      
      me {reactionType}
    </span>
  </div>
)}
  </div>
  )
}

export default LikeComment