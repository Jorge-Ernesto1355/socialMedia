import React from "react";
import "./Sidebar.css";
import friends from './icons/amigos.png'
import rem from '../../../assets/rem.jpg'
import group from './icons/grupo.png'

import marcador from './icons/marcador.png'
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../hooks/Popover/Tooltip";
import { Avatar } from "antd";
const Sidebar = () => {


  return (
  <aside className="sidebar-container">

    <li className="sidebar-item">
    <Avatar src={rem} size={'large'} alt="user"/>
      <h5 className="sidebar-text">Jorge Ernesto</h5>
    </li>

    <Tooltip>
        <TooltipTrigger> <li  className="sidebar-item">
      <img className="sidebar-icon" src={friends} alt="Friends" />
      <h5 className="sidebar-text">Amigos</h5>
    </li></TooltipTrigger>
        <TooltipContent>Minimizar</TooltipContent>
      </Tooltip>
    
    <li  className="sidebar-item">
      <img className="sidebar-icon" src={group} alt="Grupos" />
      <h5 className="sidebar-text">Grupos</h5>
    </li>
    <li  className="sidebar-item">
      <img className="sidebar-icon" src={marcador} alt="Saves" />
      <h5 className="sidebar-text">Guardados</h5>
    </li>
    <li  className="sidebar-item">
     
      <h5 className="sidebar-text">Messenger</h5>
    </li>
    
  </aside>
   
  );
};

export default Sidebar;
