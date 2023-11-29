import React from "react";
import "./Sidebar.css";
import Image from "../../../utilities/Image";
import friends from './icons/amigos.png'
import rem from '../../../assets/rem.jpg'
import group from './icons/grupo.png'
import messenger  from '../../RIGHT/messages/icons/mensajero.png'
import marcador from './icons/marcador.png'

const Sidebar = () => {


  return (
  <ul className="sidebar-container">

    <li className="sidebar-item">
    <div className="profile-photo">
						<Image src={ rem}
							alt="user"/>
		</div>
      <h5 className="sidebar-text">Jorge Ernesto</h5>
    </li>
    <li  className="sidebar-item">
      <img className="sidebar-icon" src={friends} alt="" />
      <h5 className="sidebar-text">Amigos</h5>
    </li>
    <li  className="sidebar-item">
      <img className="sidebar-icon" src={group} alt="" />
      <h5 className="sidebar-text">Grupos</h5>
    </li>
    <li  className="sidebar-item">
      <img className="sidebar-icon" src={marcador} alt="" />
      <h5 className="sidebar-text">Guardados</h5>
    </li>
    <li  className="sidebar-item">
      <img className="sidebar-icon" src={messenger} alt="" />
      <h5 className="sidebar-text">Messenger</h5>
    </li>
    
  </ul>
   
  );
};

export default Sidebar;
