import React from 'react'
import {motion} from 'framer-motion'
import like from '../../../../assets/iconsPost/likePost.png'
import { objetsImgs } from '../post/objectImg'
const LikePost = ({reactionType, setShowReactions}) => {
 
  return (
    <div className="ratingIcon">
    {reactionType === null ? (
      <img
        className="icon"
        src={like}
        alt=""
        onClick={() => setShowReactions((prev)=> !prev)}
      />
    ) : (
      <div className="actionsActivated">
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1.1 }}
          src={objetsImgs[reactionType]}
          alt=""
        />
        <span
          className={reactionType}
          onClick={() =>setShowReactions((prev)=> !prev)}
        >
          
          me {reactionType}
        </span>
      </div>
    )}
  </div>
  )
}

export default LikePost