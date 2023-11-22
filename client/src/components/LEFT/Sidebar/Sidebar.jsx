import React from "react";
import "./Sidebar.css";


import { Link } from "react-router-dom";
import Theme from "../../Theme/Theme";



const Sidebar = () => {

  const menuItem = document.querySelectorAll(".sidebar a ");


  const removeClassList = () => {
    menuItem.forEach((size) => {
      size.classList.remove("active");
    });
  };

  menuItem.forEach((menu) => {
    menu.addEventListener("click", () => {
      removeClassList();
      menu.classList.toggle("active");
    });
  });


  return (
    <div className="sidebar">
      <a className="menu-item">
        <span>
        
        </span>
        <h3>Home</h3>
      </a>

      <a className="menu-item">
        <span>
        </span>
        <h3>Explore</h3>
      </a>


      <a className="menu-item" >
        <span>
        
        </span>
        <i>9</i>
        <h3>Mensajes</h3>
      </a>
      <Link className="menu-item">
        <span>
        
        </span>
        <h3>Favoritos</h3>
      </Link>

      <a className="menu-item" >
        <span>
         
        </span>
        <Theme />
      </a>


      <label
        htmlFor="create-post"

        className="btn btn-primary"
      >
        crear post
      </label>
    </div>
  );
};

export default Sidebar;
