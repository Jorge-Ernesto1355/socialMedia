import React from "react";

import rem from "../../../assets/rem.jpg";
import "./Perfil.css";

const Perfil = () => {

  return (
    <div className="profile">
      <div className="profile-photo">
        <img src={rem} alt="" />
      </div>
      <div className="handle">
        <h4>{''}</h4>
        <p className="text-muted">@{''}</p>
      </div>
    </div>
  );
};

export default Perfil;
