import './RatingS.css';

import { variantsAction } from '../framerMotion/showActions';
import React, { useState } from 'react';
import {motion} from 'framer-motion'
import MutationRequest from '../../../../hooks/useMutationRequest';
import { objetsImgs } from '../post/objectImg';

const reactions = [{label:'gusta'}, {label:'encanta'}, {label:'entristece'}, {label:'divierte'}, {label:'asombra'} ]


const Reaction = ({
  id,
  userId,
  name,
  children, 
  request
}) => {

  const mutateRequest = MutationRequest(request, {id, name})
  const [showReactions, setShowReactions] = useState(false);
  const [reactionType, setReactionType] = useState(null);



  const MutateActionsFu = (value) => {
    setReactionType(value)
    setShowReactions(false)
    mutateRequest.mutate({userId, id, toSend:{label:value, userId}})
    
  };

  return (
    <div>
      <motion.div
      className="ratings"
      variants={variantsAction}
      animate={`${showReactions ? 'visible' : 'hidden'}`}
      transition={{
        duration: 0.2
      }}
    >
    <div className="container-rating">
      <div className="fbRating">
      {reactions?.map((reaction, index) => (
    <div className="icon" key={index}>
      <img src={objetsImgs[reaction.label]} alt="" onClick={() => MutateActionsFu(reaction.label)} />
    </div>
  ))}
      </div>
      </div>
    </motion.div>
    {React.Children.map(children, child => {
  return React.cloneElement(child, {reactionType, setShowReactions});
})}
      
    </div>
  );
};

export default Reaction;
