import React from "react";
import "./Sidebar.css";

import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
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
          <AiOutlineHome />
        </span>
        <h3>Home</h3>
      </a>

      <a className="menu-item">
        <span>
          <MdOutlineExplore />
        </span>
        <h3>Explore</h3>
      </a>


      <a className="menu-item" >
        <span>
          <AiOutlineMessage />
        </span>
        <i>9</i>
        <h3>Mensajes</h3>
      </a>
      <Link className="menu-item">
        <span>
          <BsBookmark />
        </span>
        <h3>Favoritos</h3>
      </Link>

      <a className="menu-item" >
        <span>
          <HiOutlineColorSwatch />
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
