import React from "react";
import "./Sidebar.css";
import NotificacionPopup from "./NotificationPopup/NotificacionPopup";
import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

// redux
import {
  Notification,
  Messages,
  Theme,

  SettingsRedux,
} from "../../../redux/NavigationRedux";
import { PreviewActive } from "../../../redux/PreviewPostRedux";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const menuItem = document.querySelectorAll(".sidebar a ");
  const { _id: userId } = useSelector((state) => state.user.currentUser.user);

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

  const handleNotification = (action) => {
    if (action === "theme") {
      dispatch(Theme());
    }
    if (action === "notification") {
      dispatch(Notification());
    }

    if (action === "messages") {
      dispatch(Messages());
    }

    if (action === "settings") {
      dispatch(SettingsRedux());
    }
  };

  return (
    <div className="sidebar">
      <a className="menu-item active">
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

      <a
        className="menu-item"
        onClick={() => handleNotification("notification")}
      >
        <span>
          <IoIosNotificationsOutline />
        </span>
        <i>9</i>
        <h3>Notificaciones</h3>

        {/* NOTIFICACIONES POPUP */}

        <NotificacionPopup />
      </a>

      <a className="menu-item" onClick={() => handleNotification("messages")}>
        <span>
          <AiOutlineMessage />
        </span>
        <i>9</i>
        <h3>Mensajes</h3>
      </a>
      <Link to={`/favorites/${userId}`} className="menu-item">
        <span>
          <BsBookmark />
        </span>
        <h3>Favoritos</h3>
      </Link>

      <a className="menu-item" onClick={() => handleNotification("theme")}>
        <span>
          <HiOutlineColorSwatch />
        </span>
        <h3>Theme</h3>
      </a>

      <a className="menu-item" onClick={() => handleNotification("settings")}>
        <span>
          <FiSettings />
        </span>
        <h3>Settings</h3>
      </a>
      <label
        htmlFor="create-post"
        onClick={() => dispatch(PreviewActive())}
        className="btn btn-primary"
      >
        crear post
      </label>
    </div>
  );
};

export default Sidebar;
