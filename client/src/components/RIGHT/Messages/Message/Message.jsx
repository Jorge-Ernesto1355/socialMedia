import React, { useState } from "react";
import "./Message.css";
import rem from '../../../../assets/rem.jpg'
import { objetsImgs } from "../../../MIDDLE/post/post/objectImg";
import MenuMessage from "./menuMessage/MenuMessage";

const Message = () => {
  const [isHovered, setIsHovered] = useState(false);


  return (
    <div className="message-container"
    onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     <div >
					<img
              className="profile-picture"
							src={rem}
							alt="user"
						/>
					</div>
      <div className="message-body">
         <p className="message-text">hola como estas espero que estes muy bien</p>
        <ul className="reaction-view-message">
            <img src={objetsImgs.gusta} alt="" className="view-img" />
            <img src={objetsImgs.encanta} alt="" className="view-img"/>
            <img src={objetsImgs.divierte} alt="" className="view-img" />
            <span className="lenght-reactions">85</span>
        </ul>
      </div>
      
        <MenuMessage isHovered={isHovered}/>
      
    </div>
  );
};

export default Message;
