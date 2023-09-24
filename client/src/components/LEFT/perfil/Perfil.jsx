import React from "react";
import { useSelector } from "react-redux";
import rem from "../../../assets/rem.jpg";
import "./Perfil.css";

const Perfil = () => {
  const { user } = useSelector((state) => state.user.currentUser);

  return (
    <div className="profile">
      <div className="profile-photo">
        <img src={rem} alt="" />
      </div>
      <div className="handle">
        <h4>{user?.username}</h4>
        <p className="text-muted">@{user?.username}</p>
      </div>
    </div>
  );
};

export default Perfil;
