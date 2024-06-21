import "./RatingS.css";

import React, {  useState } from "react";



import useUserRequest from "../../hooks/auth/useUserRequest";
import useMutationRequest from "../../hooks/useMutationRequest";
import ReactionService from './services/ReactionService'
import { objetsImgs } from "../MIDDLE/post/post/objectImg";

import { Popover } from "antd";
import { useMediaQuery } from "react-responsive";


export const reactions = [
  { label: "gusta" },
  { label: "encanta" },
  { label: "entristece" },
  { label: "divierte" },
  { label: "asombra" },
];


const Reaction = ({ id, userId, name, children, type}) => {
  const privateRequest = useUserRequest()
  const mutateRequest = useMutationRequest(ReactionService.React, {name})

  const [reactionType, setReactionType] = useState(null);


  const MutateActionsFu = (value) => {
    setReactionType(value);
    mutateRequest.mutate({ userId, id, label:value, privateRequest, type});
  };

 

  const content = (
    <div style={{display:"flex"}}>
     {reactions?.map((reaction, index) => (
              <div className="icon-reaction-rating" key={index}>
                <img
                  src={objetsImgs[reaction.label]}
                  alt={`${reaction.label}`}
                  onClick={() => MutateActionsFu(reaction.label)}
                />
              </div>
            ))}
    </div>
  )

  return (
    <div>
      <Popover trigger={"click"} content={content} overlayInnerStyle={{borderRadius: "60px", padding: "8px"}}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {reactionType});
          })}
      </Popover>
    </div>
  );
};

export default Reaction;
