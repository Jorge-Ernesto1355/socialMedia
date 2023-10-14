import React from "react";
import "./MessageView.css";
import rem from '../../../../assets/rem.jpg';

const MessageView = () => {
  return (
    <div className="message">
      <div className="div">
        <div className="profile-photo">
          <img
            src={
              "https://pbs.twimg.com/profile_images/819242810167525376/Ffl1qVn9_400x400.jpg"
            }
            alt=""
          />
          <div className="active"></div>
        </div>
        <div className="message-body">
          <h5>doña pelos</h5>
          <p className="text-muted">mijito vengase a comer</p>
        </div>
      </div>
      <div className="div">
        <div className="profile-photo">
          <img
            src={
              "https://i.pinimg.com/474x/ce/65/f5/ce65f525164f66aeba56149ae3becd62.jpg"
            }
            alt=""
          />
          <div className="active"></div>
        </div>
        <div className="message-body">
          <h5>Cuadgo777</h5>
          <p className="text-muted">un fortinaiti oke</p>
        </div>
      </div>
      <div className="div">
        <div className="profile-photo">
          <img src={rem} alt="" />
          <div className="active"></div>
        </div>
        <div className="message-body">
          <h5>Jorge Ernesto</h5>
          <p className="text-muted">amos al cerro oke pa</p>
        </div>
      </div>
    </div>
  );
};

export default MessageView ;
