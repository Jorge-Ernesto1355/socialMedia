import React from "react";
import "./Message.css";
import rem from '../../../../assets/rem.jpg'
import moment from 'moment'
import MenuMessage from "./menuMessage/MenuMessage";
import useHover from "../../../../hooks/useHover";
import ReactionsView from "../../../Reaction/Reactions/ReactionsView";

import notSeen from './icons/notSeen.png'
import LoaderVote from "../../../MIDDLE/post/Votes/LoaderVote";

import Reply from "./Reply/Reply";
import Image from "../../../../utilities/Image";


const Message = ({isMyMessage, message}) => {
  
  const {hovered,  show} = useHover()

  const hour =  moment(message.createdAt).format(' HH:mm');
 

  return (
    <div className={`message-container ${isMyMessage ? 'from-user'  : 'to-friend'}`}
    onMouseEnter={() => hovered(true)}
    onMouseLeave={()=> hovered(false)}
     
    >
     <div className="message-2">
       {isMyMessage && <MenuMessage isHovered={show} hovered={hovered} message={message}/> }
     {!isMyMessage && <div >
					<img
              className="profile-picture"
							src={rem}
							alt="user"
						/>
					</div> }
      <div className={`message-body  ${isMyMessage ? 'from-user'  : 'to-friend'} `}>
        
        {!!message?.reply && <Reply messageId={message?.reply} isMyMessage={isMyMessage}/>}
         <p className="message-text">{message?.text}</p>
          {isMyMessage && <div className="meta-info-message">
            <p className="meta-info-message-text text-muted">{hour}</p>
            <img className="meta-info-message-img" src={notSeen} alt="" />
          </div>}
        {!!message?.file && <Image src={message?.file?.url} className={'borderRadius:"10px"'}/>}
         <ReactionsView
						id={message?._id}
						name={"message-reactions"}
						nameView="message-reactions"
						type="Message"
            className="reaction-view-message"
					/>
      </div>
        {!isMyMessage && <MenuMessage isHovered={show} hovered={hovered} message={message}/> }
     </div>
     {message?.preview &&  <div className="loader-message">
      <LoaderVote  />
      <p className="loader-message-text">cargando...</p>
      </div>}
      
      
    </div>
  );
};

export default Message;
