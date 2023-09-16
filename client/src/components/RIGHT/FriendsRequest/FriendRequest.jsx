import React from 'react';
import './FriendRequest.css';
import rem from '../../../assets/rem.jpg';

const FriendRequest = () => {
  return (
    <div className="friend-request">
      <h4>Peticiones</h4>
      <div className="request">
        <div className="info">
          <div className="profile-photo">
            <img src={rem} alt="" />
          </div>
          <div>
            <h5>Dylan Orduño</h5>
            <p className="text-muted">8 mutual friends</p>
          </div>
        </div>
        <div className="action">
          <button className="btn btn-primary">Accept</button>
          <button className="btn ">Decline</button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
