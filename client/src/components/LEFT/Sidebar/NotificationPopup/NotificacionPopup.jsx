import React from "react";
import "./NotificacionPopup.css";

import { useSelector } from "react-redux";

const NotificacionPopup = () => {
  const { notification } = useSelector((state) => state.Navigate);

  return (
    <div className={`notification-popup ${notification ? "active" : ""}`}>
      <div>
        <div className="profile-photo">
          <img
            src={
              "https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png"
            }
            alt=""
          />
        </div>
        <div className="notification-body">
          <b>Bryant Rodriguez</b> te mando solicitud
          <small className="text-muted">hace 2 dias</small>
        </div>
      </div>
      <div>
        <div className="profile-photo">
          <img
            src={
              "https://styles.redditmedia.com/t5_gdma4/styles/communityIcon_ptc21cczol981.png"
            }
            alt=""
          />
        </div>
        <div className="notification-body">
          <b>DylanOrduño</b> te mando un mensaje
          <small className="text-muted">hace 2 dias</small>
        </div>
      </div>
      <div>
        <div className="profile-photo">
          <img
            src={"https://a.wattpad.com/useravatar/laritauu.256.805400.jpg"}
            alt=""
          />
        </div>
        <div className="notification-body">
          <b>Aranzasu</b> publico una foto
          <small className="text-muted">hace 2 dias</small>
        </div>
      </div>
      <div>
        <div className="profile-photo">
          <img
            src={
              "https://i.pinimg.com/474x/ce/65/f5/ce65f525164f66aeba56149ae3becd62.jpg"
            }
            alt=""
          />
        </div>
        <div className="notification-body">
          <b>Cuadgo</b> hizo un nuevo grupo
          <small className="text-muted">hace 2 dias</small>
        </div>
      </div>
    </div>
  );
};

export default NotificacionPopup;
