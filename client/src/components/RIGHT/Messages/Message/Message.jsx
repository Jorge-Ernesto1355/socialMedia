import React from "react";
import "./Message.css";
import rem from '../../../../assets/rem.jpg'
import moment from 'moment'
import ReactionsView from "../../../Reaction/Reactions/ReactionsView";
import notSeen from './icons/notSeen.png'
import LoaderVote from "../../../MIDDLE/post/Votes/LoaderVote";
import Reply from "./Reply/Reply";
import Image from "../../../../utilities/Image";
import { Popover } from "antd";
import MoreMessage from "./menuMessage/moreMessage";


const Message = ({isMyMessage, message}) => {
  
  

  const hour =  moment(message.createdAt).format(' HH:mm');
 

  return (
    <Popover trigger={"click"} placement="bottom" overlayInnerStyle={{padding: '6px'}} content={<MoreMessage message={message}/>}>
        <div className={`message-container ${isMyMessage ? 'from-user'  : 'to-friend'}`}
    >

     <div className="message-2">
       
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
        
     </div>
     {message?.preview &&  <div className="loader-message">
      <LoaderVote  />
      <p className="loader-message-text">cargando...</p>
      </div>}
      
      
    </div>
    </Popover>
  );
};

export default Message;
