import React from "react";
import "./Role.css";
import king from "../../../../assets/iconsPost/king.png";

const Roles = ({ role }) => {
  return (
    <div className="Roles">
      <div className={`Role ${role}`}>
        <h6>{role}</h6>
        <img src={king} alt="" />
      </div>
    </div>
  );
};

export default Roles;
