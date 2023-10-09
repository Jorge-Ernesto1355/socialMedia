import "./Navbar.css";
// librerias
import React  from "react";
import rem from "../../../assets/rem.jpg";
import Search from "../Search/Search";
import Notifications from "../../notifications/Notifications";


const Navbar = () => {


  return (
    <nav>
      <div className="container">
        <h2 className="log">cbta 81</h2>
        <Search/>
        <div className="options">
          <div className="profile-photo">
            <img src={rem} alt="" />
          </div>
          <Notifications/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
