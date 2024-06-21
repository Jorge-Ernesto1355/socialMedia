import React from "react";
import "./Message.css";
import rem from '../../../../assets/rem.jpg'
import moment from 'moment'
import ReactionsView from "../../../Reaction/Reactions/ReactionsView";
import notSeen from './icons/notSeen.png'
import LoaderVote from "../../../MIDDLE/post/Votes/LoaderVote";
import Reply from "./Reply/Reply";
import Image from "../../../../utilities/Image";
import { Flex, Popover, Typography } from "antd";
import MoreMessage from "./menuMessage/moreMessage";
import ModalStory from "../../../MIDDLE/Stories/modelStory/ModalStory";
import { objetsImgs } from "../../../MIDDLE/post/post/objectImg";

const { Text, Title} = Typography;
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
          
          <Flex vertical="column" align="end">

        {message?.story && <div className="message-story-container"><ModalStory story={message.story}/></div>}
      <div className={`message-body  ${isMyMessage ? 'from-user'  : 'to-friend'} `}>
        
        {!!message?.reply && <Reply messageId={message?.reply} isMyMessage={isMyMessage}/>}
         {message?.reactionShared ? <img className="message-reactionShared" src={objetsImgs[message.reactionShared]}/> : <Text className="message-text" >{message?.text}</Text>}
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
          </Flex>
          
        
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
