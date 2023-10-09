import "./Navbar.css";

// librerias
import React from "react";
import rem from "../../../assets/rem.jpg";
import Search from "../Search/Search";
import { useDispatch } from "react-redux";


const Navbar = () => {



  return (
    <nav>
      <div className="container">
        <h2 className="log">cbta 81</h2>
        <Search />
        <div className="create">
          <div className="profile-photo">
            <img src={rem} alt="" />
          </div>

        </div>
        <button>sign out</button>
      </div>
    </nav>
  );
};

export default Navbar;
