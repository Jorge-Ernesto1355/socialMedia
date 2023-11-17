import React from "react";
import "./Message.css";
import rem from '../../../../assets/rem.jpg'
import { objetsImgs } from "../../../MIDDLE/post/post/objectImg";
import MenuMessage from "./menuMessage/MenuMessage";
import useHover from "../../../../hooks/useHover";
import ReactionsView from "../../../Reaction/Reactions/ReactionsView";

const Message = ({isMyMessage, message}) => {
  
  const {hovered, isHovered, show} = useHover()

  return (
    <div className={`message-container ${isMyMessage ? 'from-user'  : 'to-friend'}`}
    onMouseEnter={() => hovered(true)}
    onMouseLeave={()=> hovered(false)}
     
    >
       {isMyMessage && <MenuMessage isHovered={show} hovered={hovered} /> }
     {!isMyMessage && <div >
					<img
              className="profile-picture"
							src={rem}
							alt="user"
						/>
					</div> }
      <div className="message-body">
        {message?.preview && <>cargando</>}
         <p className="message-text">{message?.text}</p>
         <ReactionsView
						id={message?._id}
						name={"message-reactions"}
						nameView="message-reactions"
						type="Message"
            className="reaction-view-message"
					/>
      </div>
      
        {!isMyMessage && <MenuMessage isHovered={isHovered} message={message} /> }
      
    </div>
  );
};

export default Message;
