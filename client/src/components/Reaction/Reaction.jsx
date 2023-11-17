import "./RatingS.css";

import { variantsAction } from "../MIDDLE/post/framerMotion/showActions";
import React, {  useState } from "react";
import { motion } from "framer-motion";


import useUserRequest from "../../hooks/auth/useUserRequest";
import useMutationRequest from "../../hooks/useMutationRequest";
import ReactionService from './services/ReactionService'
import { objetsImgs } from "../MIDDLE/post/post/objectImg";
import useHideOnOutsideClick from "../../hooks/useHideOnCLickOutside";


const reactions = [
  { label: "gusta" },
  { label: "encanta" },
  { label: "entristece" },
  { label: "divierte" },
  { label: "asombra" },
];


const Reaction = ({ id, userId, name, children, type}) => {
  const { isVisible, elementRef, show} = useHideOnOutsideClick(true);
  const privateRequest = useUserRequest()
  const mutateRequest = useMutationRequest(ReactionService.React, {name})
  const [showReactions, setShowReactions] = useState(false);
  const [reactionType, setReactionType] = useState(null);


  const MutateActionsFu = (value) => {
    setReactionType(value);
    setShowReactions(false);
    mutateRequest.mutate({ userId, id, label:value, privateRequest, type});
  };


  return (
    <div ref={elementRef}>
      {isVisible && (
        <motion.div
        className="ratings"
        variants={variantsAction}
        animate={`${showReactions ? "visible" : "hidden"}`}
        transition={{
          duration: 0.2,
        }}
      >
        <div className="container-rating">
          <div className="fbRating">
            {reactions?.map((reaction, index) => (
              <div className="icon-reaction-rating" key={index}>
                <img
                  src={objetsImgs[reaction.label]}
                  alt=""
                  onClick={() => MutateActionsFu(reaction.label)}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      )}
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { reactionType, setShowReactions, isVisible:show });
      })}
    </div>
  );
};

export default Reaction;
